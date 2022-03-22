class Listener {
  constructor(palylistService, mailSender) {
    this._palylistService = palylistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistid, targetEmail } = JSON.parse(
        message.content.toString()
      );

      const playlist = await this._palylistService.getPlaylist(playlistid);

      const songs = await this._palylistService.getSongs(playlistid);

      const resultAttachment = {
        playlist: {
          ...playlist,
          songs,
        },
      };

      console.log(resultAttachment);

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(resultAttachment)
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
