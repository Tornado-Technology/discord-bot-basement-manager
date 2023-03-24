import { Interaction } from 'discord.js';

export default {
  name: 'interactionCreate',
  async execute (interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      const cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`);

      if (!command) {
        return;
      }

      if (command.cooldown) {
        const cooldownName = `${interaction.commandName}-${interaction.user.username}`;
        const cooldownValue =  Date.now() + command.cooldown * 1000;

        if (cooldown) {
          if (Date.now() < cooldown) {
            const waitTime = Math.floor(Math.abs(Date.now() - cooldown) / 1000);
            interaction.reply(`You have to wait ${waitTime} second(s) to use this command again`)
            setTimeout(() => {
              interaction.deleteReply()
            }, 5000)
            return;
          }

          setTimeout(() => {
            interaction.client.cooldowns.delete(cooldownName);
          }, cooldownValue);
        }

        interaction.client.cooldowns.set(cooldownName, cooldownValue);
      }
      command.execute(interaction);
      return;
    }

    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        if (!command.autocomplete) {
          return;
        }
        command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
