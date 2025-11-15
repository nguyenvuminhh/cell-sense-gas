import { CONFIG } from '../config';
import { getSecret } from './gcpService';

function signPayload(payload: Record<string, unknown>, full_url: string): string {
  // 1. Load the private key from Secret Manager
  //
  const privateKeyPem = getSecret(CONFIG.SECRET_SIGNATURE_PRIVATE_KEY);
  // private key must be PKCS8 or PKCS1 PEM

  // 2. Convert your payload to a canonical string
  const data = JSON.stringify(payload) + full_url;

  // 3. Sign the data
  /* eslint-disable */
  const signature = Utilities.base64Encode(
    Utilities.computeRsaSha256Signature(data, privateKeyPem),
  );
  /* eslint-enable */
  return signature;
}

export { signPayload };
