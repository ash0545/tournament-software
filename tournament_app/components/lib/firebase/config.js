const config = {
  apiKey: "AIzaSyBRfvWAPYcNg32nwZxTL3oJaqBM3Mzn0dA",
  authDomain: "tournament-manager-e1276.firebaseapp.com",
  projectId: "tournament-manager-e1276",
  storageBucket: "tournament-manager-e1276.appspot.com",
  messagingSenderId: "594670249067",
  appId: "1:594670249067:web:713ded19b95997ed0a3d2e",
  measurementId: "G-RFBGY3K6Q1"
};

// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((key) => {
  const configValue = config[key] + "";
  if (configValue.charAt(0) === '"') {
    config[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;