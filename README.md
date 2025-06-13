# ETH-KIPU & Henry

### Trabajo Práctico Final - Módulo 4: Toolkit para desarrollo Web3

Este proyecto consiste en el desarrollo de un contrato inteligente llamado **TipJar** que permite a los usuarios enviar propinas en ETH junto con un mensaje. El owner del contrato podrá retirar los fondos acumulados.

El contrato se despliega en la testnet **Sepolia**, y cuenta con:
- Scripts de deployment y verificación con Hardhat
- Tests automatizados con Chai
- Scripts de interacción usando Ethers.js

---

## 🧪 Instrucciones de uso

### 📦 Instalación
1. Clonar el repositorio
2. Ejecutar:

   ```bash
   npm install
3. Crear un archivo .env en la raíz del proyecto con el siguiente contenido: 
    ```bash  
    ALCHEMY_API_KEY=tu_api_key_de_alchemy
    ETHERSCAN_API_KEY=tu_api_key_de_etherscan
    SEPOLIA_PRIVATE_KEY=tu_private_key_de_sepolia
    ```


## ⚙️ Comandos útiles
### 🔧 Compilar contrato

     npx hardhat compile

### ✅ Ejecutar tests

    npx hardhat test
   

### 🚀 Deploy + Verificación en Sepolia

    npx hardhat ignition deploy ./ignition/modules/TipJar.ts --network sepolia --verify

⚠️ Recuerda cambiar el address del contrato en scripts/interactTipJar.ts, línea 6:

    const TIPJAR_ADRRESS = "tu_address_de_contrato";


💬 Scripts de interacción
El archivo scripts/interactTipJar.ts permite:

- Enviar una propina (tip)

- Consultar el balance (getBalance)

- Ejecutar el retiro (withdraw)

- Leer un mensaje de la historia (tipHistory)    

⚠️ Comenta o descomenta las funciones que quieras probar en el main().

Ejecutar:

    npx hardhat run scripts/interactTipJar.ts

### 🧰 Otros comandos útiles    

    npx hardhat help
    npx hardhat node

### 🔗 Contrato desplegado

     Sepolia: https://sepolia.etherscan.io/address/0xa08152b2733695aaA63Ad14D76FA1FD2509A4719#code


