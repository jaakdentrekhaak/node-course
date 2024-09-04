import { NextFunction, Request, Response } from "express";
import { UserStore } from "./user.store.js";

export const update = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const user = UserStore.get(id);

  if (!user) {
    return res
      .status(404)
      .json({ error: `User with id ${req.params.id} doesn't exist` });
  }
  const updated = UserStore.update(id, res.locals.body);

  res.locals.body = updated;
  next();
};
