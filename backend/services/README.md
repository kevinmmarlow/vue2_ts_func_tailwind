# Models

Models are the javascript POJOs that represent our persistent store such as MySql, Mongo, etc. We may choose to connect to our database via an ORM such as Knex/Objection or Mongoose.

_**Note:** Be careful on which persistence layer you chose. Not all are easily testable. You may need to astract your model layer such that you can stub it properly for unit testing._

### Data Flow

Routes -> Controllers -> Services -> Models

### Example Code

```
import User from '@/models/user'

interface UserQuery {
  organization_id?: number
  search: string
  deleted?: boolean
  page?: number
}

export default class UserService {
  public async list(q: UserQuery): Promise<User[]> {
    const result = await _createUserQuery(q)
    return result
  }
}
```
