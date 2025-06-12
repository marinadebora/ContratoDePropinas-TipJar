import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TipJarModule = buildModule("TipJar", (m) => {

  const tipJar = m.contract("TipJar");

  return { tipJar };
});

export default TipJarModule;