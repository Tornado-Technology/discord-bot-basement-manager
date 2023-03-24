import { Role } from 'discord.js';

export default {
  name: 'roleDelete',
  async execute (role: Role) {
    const newRole = await role.guild.roles.create(role);

    role.members.every((member) => {
      console.log(member.nickname);
      member.roles.add(newRole);
    });
  }
};
