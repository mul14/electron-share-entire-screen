const os = require("os");
const { systemPreferences } = require("electron");

/**
 * Ask for permission - macOS only
 * @param {('microphone'|'camera'|'screen')} mediaType The media type
 * @return {Promise<boolean>} granted or denied
 */
async function askForPermission(mediaType) {
  try {
    if (os.platform() !== 'darwin') return true;

    if (["microphone", "camera", "screen"].indexOf(mediaType) === -1) {
      throw new Error(`Invalid mediaType:`, mediaType);
    }

    const status = await systemPreferences.getMediaAccessStatus(mediaType);
    console.info(`Current ${mediaType} access status:`, status);

    if (status === "not-determined") {
      const success = await systemPreferences.askForMediaAccess(mediaType);
      console.info(`Result of ${mediaType} access:`, success.valueOf() ? "granted" : "denied");
      return success.valueOf();
    }

    return status === "granted";
  } catch (error) {
    console.error(`Could not get permission:`, error.message);
  }

  return false;
}

module.exports = askForPermission;
