import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/route.interface";

class UserRoutes implements Routes {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initUserRoute();
  }

  /**
   *
   */
  public initUserRoute() {
    // TODO: Get all users
    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      return res.json({
        ok: true,
        message: "List of users",
      });
    });

    // TODO: Get user by Id
    this.router.get(`${this.path}/:id`, (req: Request, res: Response) => {
      const { id: userId } = req.params;

      return res.json({
        ok: true,
        message: `User's detail - ${userId}`,
      });
    });

    // TODO: Create user
    this.router.post(`${this.path}`, (req: Request, res: Response) => {
      const { body: userBody } = req;

      return res.json({
        ok: true,
        message: `User succesfully created`,
        data: userBody,
      });
    });

    // TODO: Update user by Id
    this.router.put(`${this.path}/:id`, (req: Request, res: Response) => {
      const { id: userId } = req.params;
      const { body: userBody } = req;

      return res.json({
        ok: true,
        message: `User succesfully updated - ${userId}`,
        data: userBody,
      });
    });

    // TODO: Delete user by Id
    this.router.delete(`${this.path}/:id`, (req: Request, res: Response) => {
      const { id: userId } = req.params;

      return res.json({
        ok: true,
        message: `User succesfully deleted - ${userId}`,
      });
    });
  }
}

export default UserRoutes;
