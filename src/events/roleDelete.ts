import { Role } from 'discord.js';
import client from '../index.js';

export default {
  name: 'roleDelete',
  async execute (role: Role) {
    if (!client.protection) {
      return;
    }

    const newRole = await role.guild.roles.create(role);
    role.members.every((member) => {
      console.log(member.nickname);
      member.roles.add(newRole);
    });
  }
};
