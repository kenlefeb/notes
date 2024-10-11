
const vaultPath = "~/notes";

const configuration = {
  today: new Date(),
  paths: {
    vault: vaultPath,               // This contains all notes
    journal: `${vaultPath}/@`,      // This contains daily notes
    rolodex: `${vaultPath}/=`,      // This contains notes about specific entities (people, places, things)
    encyclopedia: `${vaultPath}/#`  // This contains notes about topics
    }
};

export default configuration;