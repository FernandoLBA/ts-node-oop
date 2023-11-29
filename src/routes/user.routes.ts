import { NextFunction, Request, Response, Router } from "express";

import { BaseRouter } from "../shared/router/base.router";
import UserController from "../user/controllers/user.controller";
import { ValidateMiddlewareDTO } from "../shared/middleware/validate-dto.middleware";
import { UserDTO } from "../user/dto/user.dto";

class UserRoutes extends BaseRouter<UserController, ValidateMiddlewareDTO> {
  public path = "/user";
  public router = Router();
  public userController = new UserController();

  constructor() {
    super(UserController, ValidateMiddlewareDTO);
    this.initUserRoute();
  }

  /**
   * @swagger
   * components:
   *  securitySchemes:
   *    bearerAuth:
   *      type: http
   *      scheme: bearer
   *      bearerFormat: JWT
   *  schemas:
   *    Users:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          description: user id
   *        name:
   *          type: string
   *          description: user name
   *        lastName:
   *          type: string
   *          description: user lastName
   *        email:
   *          type: string
   *          description: user email
   *        gender:
   *          type: string
   *          description: user gender
   *        role:
   *          type: string
   *          description: user role
   *        createdAt:
   *          type: number
   *          format: date
   *          description: creating date of the user
   *        updatedAt:
   *          type: number
   *          format: date
   *          description: updating date of the user
   *      example:
   *        id: 1
   *        name: Fernando
   *        lastName: Barrios
   *        email: flba@mail.com
   *        gender: M
   *        role: ADMIN
   *        createdAt: 2023-11-12
   *        updatedAt: 2023-11-12
   *    User:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          description: user id
   *        name:
   *          type: string
   *          description: user name
   *        lastName:
   *          type: string
   *          description: user lastName
   *        email:
   *          type: string
   *          description: user email
   *        gender:
   *          type: string
   *          description: user gender
   *        role:
   *          type: string
   *          description: user role
   *        createdAt:
   *          type: number
   *          format: date
   *          description: creating date of the user
   *        updatedAt:
   *          type: number
   *          format: date
   *          description: updating date of the user
   *      example:
   *        id: 1
   *        name: Fernando
   *        lastName: Barrios
   *        email: flba@mail.com
   *        gender: M
   *        role: ADMIN
   *        createdAt: 2023-11-12
   *        updatedAt: 2023-11-12
   *    UserWithCustomer:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          description: user id
   *        name:
   *          type: string
   *          description: user name
   *        lastName:
   *          type: string
   *          description: user lastName
   *        email:
   *          type: string
   *          description: user email
   *        gender:
   *          type: string
   *          description: user gender
   *        role:
   *          type: string
   *          description: user role
   *        createdAt:
   *          type: number
   *          format: date
   *          description: creating date of the user
   *        updatedAt:
   *          type: number
   *          format: date
   *          description: updating date of the user
   *      example:
   *        id: 1
   *        name: Fernando
   *        lastName: Barrios
   *        email: flba@mail.com
   *        gender: M
   *        role: ADMIN
   *        createdAt: 2023-11-12
   *        updatedAt: 2023-11-12
   *        customer:
   *          id: 1
   *          name: Fernando
   *          createdAt: 2023-11-12
   *          updatedAt: 2023-11-123
   *    CreateUser:
   *      type: object
   *      properties:
   *        name:
   *          type: string
   *          description: user name
   *        lastName:
   *          type: string
   *          description: user lastName
   *        email:
   *          type: string
   *          description: user email
   *        gender:
   *          type: string
   *          description: user gender
   *        role:
   *          type: string
   *          description: user role
   *        createdAt:
   *          type: number
   *          format: date
   *          description: creating date of the user
   *        updatedAt:
   *          type: number
   *          format: date
   *          description: updating date of the user
   *        customer:
   *          type: number
   *          description: customer relationship
   *      example:
   *        name: Fernando
   *        lastName: Barrios
   *        email: flba@mail.com
   *        gender: M
   *        role: ADMIN
   *        createdAt: 2023-11-12
   *        updatedAt: 2023-11-12
   *        customer: 1
   *    UpdateUser:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *          description: user id
   *        name:
   *          type: string
   *          description: user name
   *        lastName:
   *          type: string
   *          description: user lastName
   *        email:
   *          type: string
   *          description: user email
   *        gender:
   *          type: string
   *          description: user gender
   *        role:
   *          type: string
   *          description: user role
   *        createdAt:
   *          type: number
   *          format: date
   *          description: creating date of the user
   *        updatedAt:
   *          type: number
   *          format: date
   *          description: updating date of the user
   *      example:
   *        id: 1
   *        name: Fernando
   *        lastName: Barrios
   *        email: flba@mail.com
   *        gender: M
   *        role: ADMIN
   *        createdAt: 2023-11-12
   *        updatedAt: 2023-11-22
   *    DeleteUser:
   *      type: object
   *      properties:
   *        affected:
   *          type: string
   *          description: record affected
   *      example:
   *        affected: 1
   *    NonDeleteUser:
   *      type: object
   *      properties:
   *        affected:
   *          type: string
   *          description: record affected
   *      example:
   *        affected: 0
   */

  /**
   * @swagger
   *  tags:
   *    name: Users
   *    description: Users Endpoints
   */
  public initUserRoute() {
    // * Get all users
    /**
     * @swagger
     * /api/v1/users:
     *  get:
     *    summary: get all users from DB
     *    tags: [Users]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#components/schemas/Users'
     *              description: array of users
     *      400:
     *        description: bad request / general error
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}s`, this.middleware.passAuth("jwt"), this.userController.getAllUsers);

    // * Get user by Id
    /**
     * @swagger
     * /api/v1/user/{id}:
     *  get:
     *    summary: get an user by id from DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Users]
     *    security:
     *      - bearerAuth: []
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/User'
     *              description: user
     *      400:
     *        description: bad request / general error
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}/:id`, this.middleware.passAuth("jwt"), this.userController.getUserById);

    // * Get user by Id with Customer Relation
    /**
     * @swagger
     * /api/v1/user/rel/{id}:
     *  get:
     *    summary: get an user by id from DB with customer
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Users]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/UserWithCustomer'
     *              description: user
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: unauthorized
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.get(
      `${this.path}/rel/:id`,
      this.middleware.passAuth("jwt"),
      this.userController.getUserByIdWithCustomerRelation,
    );

    // * Create user
    /**
     * @swagger
     * /api/v1/user:
     *  post:
     *    summary: create an user in the DB
     *    tags: [Users]
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/CreateUser'
     *              description: user
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: unauthorized
     *      500:
     *        description: server side error
     */
    this.router.post(
      `${this.path}`,
      // * Aquí se colocará un array de middlewares, que se ejecutan a través de esta función
      (req: Request, res: Response, next: NextFunction) => [this.middleware.validator(req, res, next, UserDTO)],
      this.userController.createUser,
    );

    // * Update user by Id
    /**
     * @swagger
     * /api/v1/user/{id}:
     *  put:
     *    summary: update an user from the DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Users]
     *    security:
     *      - bearerAuth: []
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/UpdateUser'
     *              description: user
     *      400:
     *        description: bad request / general error
     *      401:
     *        description: unauthorized
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.put(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.checkAdminRole(req, res, next)],
      this.userController.updateUserById,
    );

    // * Delete user by Id
    /**
     * @swagger
     * /api/v1/user/{id}:
     *  delete:
     *    summary: delete an user from the DB
     *    parameters:
     *      - in: path
     *        name: id
     *        required: true
     *        schema:
     *          type: string
     *    tags: [Users]
     *    security:
     *      - bearerAuth: []
     *    responses:
     *      200:
     *        description: ✅ - OK
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/DeleteUser'
     *              description: user
     *      400:
     *        description: bad request / general error
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              $ref: '#components/schemas/NonDeleteUser'
     *              description: user
     *      401:
     *        description: unauthorized
     *      404:
     *        description: 🕵️ - Not Found
     *      500:
     *        description: server side error
     */
    this.router.delete(
      `${this.path}/:id`,
      this.middleware.passAuth("jwt"),
      (req: Request, res: Response, next: NextFunction) => [this.middleware.checkAdminRole(req, res, next)],
      this.userController.deleteUserById,
    );
  }
}

export default UserRoutes;
