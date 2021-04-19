# Routes

Routes map api paths and HTTP methods to Controllers. They also allow us to hook middleware in for various forms of validation, token decoding, RBAC, and more.

Routes can be better modularized based on either function or model and then imported into the parent and connected to the main router. Make sure to use `Router({ mergeParams: true })` in order to pass parent params down to child routers.

### Data Flow

Routes -> Controllers -> Services -> Models

### Example Code

```
export default (): Router => {
  const app = Router()

  app.get(
    '/account',
    auth,
    permissionCheck([PERMISSIONS.USER.ACCOUNT.READ]),
    getMe
  )
  app.patch(
    '/account/password',
    auth,
    permissionCheck([PERMISSIONS.USER.ACCOUNT.UPDATE]),
    validatePatchAuthMePassword,
    patchMyPassword
  )
  app.put(
    '/account',
    auth,
    permissionCheck([PERMISSIONS.USER.ACCOUNT.UPDATE]),
    validatePutAccount,
    putMe
  )
  app.delete(
    '/account',
    auth,
    permissionCheck([PERMISSIONS.USER.ACCOUNT.DELETE]),
    deleteMe
  )

  return app
}

```
