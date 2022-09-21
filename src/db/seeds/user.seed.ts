import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/role.enum';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const userExists = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    if (userExists.length) return;

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('AlphaAdmin123$*', salt);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          role: Role.SuperAdmin,
          email: 'panhboth14@gmail.com',
          password: password,
          fullname: 'Super Admin',
        },
      ])
      .execute();
  }
}
