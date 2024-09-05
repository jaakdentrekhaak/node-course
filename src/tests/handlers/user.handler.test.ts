import { expect } from "chai";
import {
  User,
  UserStore,
} from "../../controllers/users/handlers/user.store.js";
import { getList } from "../../controllers/users/handlers/getList.handler.js";
import { NextFunction, Request, Response } from "express";
import { get } from "../../controllers/users/handlers/get.handler.js";
import { UserBody } from "../../contracts/user.body.js";
import { create } from "../../controllers/users/handlers/create.handler.js";
import { UserView } from "../../contracts/user.view.js";
import { update } from "../../controllers/users/handlers/update.handler.js";
import { deleteUser } from "../../controllers/users/handlers/delete.handler.js";

const userFixtures: User[] = [
  {
    name: "test1",
    email: "test-user+1@panenco.com",
    id: 0,
    password: "password1",
  },
  {
    name: "test2",
    email: "test-user+2@panenco.com",
    id: 1,
    password: "password2",
  },
];

describe("Handler tests", () => {
  describe("User tests", () => {
    beforeEach(() => {
      UserStore.users = [...userFixtures];
    });

    it("should get users", () => {
      const [res, count] = getList(null);

      expect(res.some((x) => x.name === "test2")).true;
    });

    it("should search users", () => {
      const [res, count] = getList("test1");
      expect(res.some((x) => x.name === "test1")).true;
    });

    it("should get user by id", () => {
      const res = get("1");

      expect(res.name).equal("test2");
      expect(res.email).equal("test-user+2@panenco.com");
    });

    it("should fail when getting user by unknown id", () => {
      try {
        get("999");
      } catch (error) {
        expect(error.message).equal("User not found");
        return;
      }
      expect(true, "should have thrown an error").false;
    });

    it("should create user", async () => {
      const body = {
        email: "test-user+new@panenco.com",
        name: "newUser",
        password: "reallysecretstuff",
      } as User;
      const res = await create(body);

      expect(res.name).equal("newUser");
      expect(res.email).equal("test-user+new@panenco.com");
    });

    it("should update user", async () => {
      const body = {
        email: "test-user+updated@panenco.com",
      } as User;
      const id = 0;
      const res = update(body, id.toString());

      expect(res.email).equal(body.email);
      expect(res.name).equal("test1");
      expect(UserStore.users.find((x) => x.id === id).email).equal(body.email);
    });

    it("should delete user by id", () => {
      const initialCount = UserStore.users.length;
      deleteUser("1");

      expect(UserStore.users.some((x) => x.id === 1)).false;
      expect(initialCount - 1).equal(UserStore.users.length);
    });
  });
});
