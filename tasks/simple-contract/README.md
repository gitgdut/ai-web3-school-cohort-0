## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
<img width="2106" height="225" alt="屏幕截图 2026-05-24 190530" src="https://github.com/user-attachments/assets/705468cc-97d9-4031-808f-5b74bc13895a" />
<img width="2122" height="98" alt="屏幕截图 2026-05-24 191718" src="https://github.com/user-attachments/assets/a5d044b5-fb50-4ba4-8af9-c20d8fbd9ee7" />
<img width="2103" height="774" alt="屏幕截图 2026-05-24 191737" src="https://github.com/user-attachments/assets/21a89b0e-6b42-4fa3-8a61-f0e80abfd6d4" />

