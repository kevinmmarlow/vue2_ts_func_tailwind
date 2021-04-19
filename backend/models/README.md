# Services

Services are where our business logic lies. They are independent of our backend framework and should be pure such that they are easily unit-testable. Services typically take the HTTP method handlers known as Controllers and perform actions on a persistent store such as MySql, Mongo, etc.

_**Note:** Be careful on which persistence layer you chose. Not all are easily testable. You may need to astract your model layer such that you can stub it properly for unit testing._

### Data Flow

Routes -> Controllers -> Services -> Models

### Example Code

```
export default class User extends Model {
  public id!: number
  public organization_id!: number
  public organization!: Organization
  public role_id!: number
  public role!: Role
  public first_name!: string
  public last_name!: string
  public email!: string
  public email_verified?: boolean
  public created_at!: Date
  public updated_at!: Date

  public static get tableName(): string {
    return 'User'
  }

  static relationMappings = () => ({
    organization: {
      relation: Model.BelongsToOneRelation,
      modelClass: Organization,
      join: {
        from: 'User.organization_id',
        to: 'Organization.id',
      },
    },
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'User.role_id',
        to: 'Role.id',
      },
    },
  })
}
```
