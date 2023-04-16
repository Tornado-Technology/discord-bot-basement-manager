import { GuildBan, PermissionsBitField, AuditLogEvent } from 'discord.js';
import { UserBanModel } from '../schemas/userBan';
import client from "../index";

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default {
  name: 'guildBanAdd',
  async execute (ban: GuildBan) {
    await delay(5000);
    const { guild } = ban;
    const fetchedLogs = await guild.fetchAuditLogs({
      type: AuditLogEvent.MemberBanAdd,
      limit: 1,
    });
    const entries = fetchedLogs.entries.first();
    const reason = entries?.reason ?? 'Без причины.';
    const executor = entries?.executor;
    if (!executor) {
      return;
    }

    const model = new UserBanModel({
      moderatorId: executor.id,
      guildId: ban.guild.id,
      partial: ban.partial,
      reason,
      userId: ban.user.id,
    });
    await model.save();
    const banned = await UserBanModel.find({
      guildId: ban.guild.id,
      moderatorId: executor.id,
    });

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const filtered = banned.filter((banInfo) => (
      banInfo.date >= start && banInfo.date <= end
    ));

    if (filtered.length >= 5) {
      const member = await guild.members.fetch(executor.id);
      if (!member) {
        console.error('Member not found!');
        return;
      }

      const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r);
      const administrationRoles = roles.filter((role) => role.permissions.has([
        PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers
      ]));

      for (const role of administrationRoles) {
        if (member?.roles.cache.has(role.id)) {
          await member?.roles.remove(role).catch(console.error);
        }
      }
    }
  }
};
