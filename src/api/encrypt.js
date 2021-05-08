import {JSEncrypt} from 'jsencrypt'

export function encrypt(message){
  var encrypt=new JSEncrypt();
  encrypt.setPublicKey(`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKrbrsAf1vVkXF054eGlCqRYQin/o1fejDyPTEAvOfFHCgIfSY/aslNhStRnSqM4MlXdL8iM+6KxsQ5shG3qF3zfGMYqwgQUgw4+aE/xcma7xLlGjLsUG08p0l+9Aa6dBU3q0EWN5hnbitSPOhsUFQ7irGhOmkpA233Gscjz1YbQIDAQAB`);	//	 publicKey为公钥
  const txt = encrypt.encrypt(message);
  return txt;
}
