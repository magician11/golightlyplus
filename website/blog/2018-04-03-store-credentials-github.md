---
slug: store-credentials-github
title: How to safely store credentials in GitHub
authors: andrew
---

It is actually pretty convenient to have credentials and keys stored in the same repository as your codebase. Of course this is unsafe, as anyone (if you’re using public repos) can use those credentials to access your infrastructure (databases, servers, 3rd party APIs).

So firstly if your code is not for public use, a private repository obviously improves the security of your credentials immediately.

<!--truncate-->

Bottom line, though, is if you store your credentials in a repository like on GitHub, encrypt those config files and keys first before committing them.

### GNU Privacy Guard

For encryption we’ll be using [GnuPG](https://www.gnupg.org/).

### Install GnuPG

First step is to go and download the binary for your OS [here](https://www.gnupg.org/download/index.html).

### Generate a keypair for yourself

Once installed, we need to generate a key pair for ourselves. Open a terminal and type

`gpg2 --gen-key`

Answer the prompts, and (importantly!) choose a strong passphrase.

### Encrypt a file

In your terminal, let’s say we want to encrypt a file called “keys.js” (which might have some config credentials that our codebase uses).

Type..

`gpg2 -e -a -s -r support@andrewgolightly.com keys.js`

What the parameters mean:

- -e means to encrypt the file
- -a means to “create ascii armored output”. Basically you can view the file, instead of it being a binary file.
- -s means to sign the file
- -r means to choose which recipient should be able to decrypt the file. In our case I’m using my email address that I used to create the key pair above
- keys.js is the name of the file I want to encrypt

This will generate a file in the same directory called keys.js.asc.

If you view the file e.g. `less keys.js.asc` you’ll see something like

```
-----BEGIN PGP MESSAGE-----

hQEMA4ZIL4znZiEXAQgAnbrsoC3GkeDQAKoJOVPEGcxET5SRkWuF7v7zO5ND1cp6
qlabecjdqsSmxSsHjAMdyvCGBfQXMEbNnqmxHmB5YMA79bS/TbQQYEx6xv9EBJfu
7aU/vjTxVSDA9ySbscptTbSGWbJG7dOa2RkAvbgjF5D7OYaRvVZP+9KuI4D3O0PI
m80Kxl4DeY+UTvgian3cfGiBKTTWcl9diBkHvGBIVC8NGHt/+htVXbDxLIvmU4vK
+HEWBqqA/HZqD5jTT4nqER65nQaCibZ0oouAUy5vcdQaOcwRhsFdjVTu5vobnXUP
K2TfFNrt9izqzCWPjBcD8bzCUFvu54t+03NIJUXg4tLpAaeMB9k66R0gbKzb7bGy
ibW2hyHhX3N0a2gyvN+/PzgNiEuwhgOOrZyl4XqVy+E3uzMXk3kDmdUCbqv44vxq
6+HSfNfRqHyAZ4XaQ6BXdCteClkMPHteAOv39MczKXSFMMEG7VojYuZ7DxQVjFrc
KNZEnOCjmAVZK3bIJwEgXTWuC0uN4ZyHPS3UUS20rYlwdQBXgW5SS4FkX/omzY1r
ptFhZ3xJ3MSp3Bh+MS4jPWTgnnjkh9uXcFSvGoCdtyWVr3fAjbUro4JIbePiTbTI
mci181SgS9xXVv+yp0QdiHhBFwGGXRWr45r3S36VN3UzYjPtqfYkbNGMWIYnmbqY
GjMwlhUPNwb6eZAI/iE8uQynLT6WklLmpdBgbZ0lDIU6gWGprZ1Ayhj3sPcMoux2
EIELLWjyk0EKgQIK6BGnvEsBAZPHYZJTr+RVbZFWjRKNzf3RfPHm8mJRnvAPTq+b
gjMv4GCuGwVNwU7NGJPTl2MVLFILjg4PlSFy0tzNagk7wmggaLsk/vsRZmPB5LzJ
H4V4sji5iH4sxFDO74/88Bt234rTlQT7cOwiEGFF9ScE62K/8LlyhEXfyuuFG1k4
rpZy6XmqVrKa4ogh51OR6Jl93Ke3xbrbAzkHfO2TBHiFEqdGeIrrEkgxmVeftigY
xsva+zTCmGc7JKGKmDWeXM/AeTy32ZKJEbbX/rjkjnmJSUf1PVd+xupXsPD6yy+p
DLJ4HleW0Fj9pbJM2Gsq8vMRt01BrEJd9VRfOZriqUY1CbC6ZF2Y3yUajlKV8Haj
88wQPD48MMuqIH5x8DtVwsK0ZSlssEtZS56pwNR11J8N4y7tDeKUR4e8yneTQ22L
PhCLqE2G2zUcJCd5Rg0UHSAy/Ko37PARWy+JErHgu7QKkLkWkUus8fIEgUR6Wc05
T2p1YYDx56bXCu/zqABrzWnBHTWDbCNUytpwdlJPgUa+YLkLFtuKX4FSAM2q5D+q
TuLLzan5gqUKemzOVRymPNyTH+XD/TkCZ9urMManTjpRP4JBrx+sZW6tFY6P958M
FLNwddt7giEhiYIXfQYEW1Qu0VH3cekjW95purRbauHu2A7g5f7Q71+1cFc=
=TCNH
-----END PGP MESSAGE-----
```

### To decrypt a file

In your terminal, type

`gpg2 -d -o keys.js keys.js.asc`

What the parameters mean:

- -d means to decrypt the file
- -o specifies the name of the output file to save the decrypted data into. If you don’t specify this option, the decrypted contents will appear in your terminal

You’ll be prompted for your passphrase for your private key.

### Update your .gitignore file

Now that we have encrypted our credentials file, make sure you ignore the credentials files, but not the encrypted files.

For example, if your credentials (config files and private keys) are in a config directory, you would update the `.gitignore` file to have something like

```txt title=".gitignore"
node_modules/
config/*.json
config/*.js
```

Now you can safely commit your encrypted credentials

`git add .`

`git commit -a -m "encrypted credentials"`

`git push`

### Backing up your private key

Make sure you backup your private key though. As if you lose it you won’t be able to decrypt those committed credentials.

To export your private key, type

`gpg2 --export-secret-key -a -o andrew-golightly.asc 'Andrew Golightly'`

Which will export your private key in ascii armored output to `andrew-golightly.asc`

To store it, there are a number of things you could do.

One way is to zip that file and encrypt it, and store it on a backup (encrypted) USB or external disk.

To zip and encrypt a file on a Mac, type:

`zip -e ag-gnupg.zip andrew-golightly.asc`

You’ll be prompted for a password to encrypt the zip with.

Oh and make sure you remember your passphrase too 🙂