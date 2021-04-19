# Controllers

Controllers separate the Express Framework from our business logic. The job of the controller is to pull out query params and payloads from requests and pass them to the service layer. This enables service layers to be pure and unit-testable. This also allows us to easily port our business logic to other Frameworks such as Koa.

### Data Flow

Routes -> Controllers -> Services -> Models

### Example Code

```
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // after authentication, an agent is attached in req, we can use that to response
    // Most likely a device or bot
    res.status(200).json(req.auth_agent)
  } catch (e) {
    next(e)
  }
}

export const patchMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await authService.updateMe(req.body, req.auth_agent)
    res.status(200).json(result)
  } catch (e) {
    next(e)
  }
}

export const deleteMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const role = req.auth_agent.role.name
    if (isUser(role)) {
      const id = req.auth_agent.id
      await auth.softDeleteUser(id)
    }
    if (isAdmin(role)) {
      const organization_id = req.auth_agent.organization.id
      await auth.softDeleteOrgAndAdmin(organization_id)
    }
    res.status(204).end()
  } catch (e) {
    next(e)
  }
}
```
