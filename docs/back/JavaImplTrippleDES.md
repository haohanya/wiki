> 需求：将C#的 TrippleDES加密数据在Java中进行解密与加密
>

**加密流程**

1、密钥通过MD5进行Hash摘要运算

2、使用Hash值进行DES加密

3、将最终加密的结果进行Base64编码

**解密流程**

1、密钥通过MD5进行Hash摘要运算

2、将密文进行Base64解码

3，进行DES解密

下面放出C#的伪代码

```c#
static void Main(string[] args)
{
    byte[] key = System.Text.Encoding.Default.GetBytes("AB");
    byte[] md5 = getMd5(key);

    byte[] value = System.Text.Encoding.Default.GetBytes("admin");
    byte[] encrypt = Encrypt(value, key);

    string en = Convert.ToBase64String(encrypt);
    Console.WriteLine("密文：" + en);

    byte[] de = Convert.FromBase64String(en);

    Console.WriteLine("明文：" + Encoding.Default.GetString(Decrypt(de, key)));
    Console.ReadLine();
}


//创建getMd5方法以获得userPwd的Md5值
public static byte[] getMd5(byte[] key)
{
    MD5CryptoServiceProvider myMd5 = new MD5CryptoServiceProvider();
    byte[] byteMd5UserPwd = myMd5.ComputeHash(key);
    return byteMd5UserPwd;
}

public static byte[] Encrypt(byte[] original, byte[] key)
{
    TripleDESCryptoServiceProvider des = new TripleDESCryptoServiceProvider();
    des.Key = getMd5(key);
    des.Mode = CipherMode.ECB;
    return des.CreateEncryptor().TransformFinalBlock(original, 0, original.Length);
}

public static byte[] Decrypt(byte[] encrypted, byte[] key)
{
    TripleDESCryptoServiceProvider des = new TripleDESCryptoServiceProvider();

    des.Key = getMd5(key);
    des.Mode = CipherMode.ECB;

    return des.CreateDecryptor().TransformFinalBlock(encrypted, 0, encrypted.Length);
}
```

因为在Java中实现这个加密算法和C#中有些不同

在Java中，密钥长度要求24个字节，但是这个密钥仅仅有2个字节，Hash后也才16个字节

这里就需要通过补位来实现了

我们可以将Hash值的前8位，补齐到剩余的后8位中，即可实现加解密

Java伪代码如下：

```java
public static void main(String[] args) throws Exception {
    // key
    byte[] makeMd5 = makeMd5("AB".getBytes());
    // content
    byte[] content = "admin".getBytes();

    byte[] bytes = makeUpButes(makeMd5);

    byte[] bytes1 = des3EncodeECB(bytes, content);
    System.out.println(Base64.encodeBase64String(bytes1));
    System.out.println(new String(ees3DecodeECB(bytes, bytes1)));
}

public static byte[] makeUpButes(byte[] key) {
    byte[] bytes = new byte[24];

    for (int i = 0; i < key.length; i++) {
        bytes[i] = key[i];
    }
    for (int i = 0; i < 8; i++) {
        bytes[key.length + i] = key[i];
    }
    return bytes;
}

public static byte[] makeMd5(byte[] original) throws NoSuchAlgorithmException {
    // key md5后的值
    java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
    md.update(original);
    byte[] digest = md.digest();
    return digest;
}

public static byte[] des3EncodeECB(byte[] key, byte[] data)
        throws Exception {
    DESedeKeySpec spec = new DESedeKeySpec(key);
    SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
    Key deskey = keyfactory.generateSecret(spec);
    Cipher cipher = Cipher.getInstance("desede/ECB/PKCS5Padding");
    cipher.init(Cipher.ENCRYPT_MODE, deskey);
    return cipher.doFinal(data);
}

public static byte[] ees3DecodeECB(byte[] key, byte[] data)
        throws Exception {
    DESedeKeySpec spec = new DESedeKeySpec(key);
    SecretKeyFactory keyfactory = SecretKeyFactory.getInstance("desede");
    Key deskey = keyfactory.generateSecret(spec);
    Cipher cipher = Cipher.getInstance("desede" + "/ECB/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, deskey);
    return cipher.doFinal(data);
}
```
