import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;
  const [ deployer, beneficiary ] = await hre.ethers.getSigners();
  const { deploy } = deployments;

  const vestingWallet = await deploy("VestingWallet", {
    from: deployer.address,
    args: [
      beneficiary.address,
      100000,
      10000,
    ],
    log: true,
  });

  console.log("VestingWallet Deployed at: ", vestingWallet.address);
};
export default deploy;