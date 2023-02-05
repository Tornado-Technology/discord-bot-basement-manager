export class ReactionMessage {
  constructor(serverId, channelId, messageId, reaction, roleId) {
    this.serverId = serverId;
    this.channelId = channelId;
    this.messageId = messageId;
    this.reaction = reaction;
    this.roleId = roleId;
  }
}