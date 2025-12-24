// Deploy Smart Contract Page
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple Storage Contract ABI & Bytecode
    // Contract Source Code:
    // pragma solidity ^0.8.0;
    // contract SimpleStorage {
    //     uint256 private storedData;
    //     function store(uint256 x) public { storedData = x; }
    //     function retrieve() public view returns (uint256) { return storedData; }
    // }
    
    const CONTRACTS = {
        SimpleStorage: {
            name: 'SimpleStorage',
            abi: [
                {
                    "inputs": [],
                    "name": "retrieve",
                    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [{"internalType": "uint256", "name": "x", "type": "uint256"}],
                    "name": "store",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            // Valid SimpleStorage bytecode compiled with Solidity 0.8.0
            bytecode: '0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea2646970667358221220890ad571dbf8fff7e822033b9cc2346299f75152dd4fad7eea8f5d13ce62c43764736f6c63430008070033'
        },
        // ============ TOKEN CONTRACT BARU ============
        SimpleToken: {
            name: 'SimpleToken',
            abi: [
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {"internalType": "address", "name": "to", "type": "address"},
                        {"internalType": "uint256", "name": "amount", "type": "uint256"}
                    ],
                    "name": "transfer",
                    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ],
            bytecode: '0x608060405234801561001057600080fd5b506040516107e03803806107e08339818101604052810190610032919061024a565b81600390805190602001906100489291906100fd565b50806004908051906020019061005f9291906100fd565b50670de0b6b3a76400008261007491906102d3565b6005819055506005546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505050506103a4565b8280546100d99061035f565b90600052602060002090601f0160209004810192826100fb5760008555610142565b82601f1061011457805160ff1916838001178555610142565b82800160010185558215610142579182015b82811115610141578251825591602001919060010190610126565b5b50905061014f9190610153565b5090565b5b8082111561016c576000816000905550600101610154565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6101d78261018e565b810181811067ffffffffffffffff821117156101f6576101f561019f565b5b80604052505050565b6000610209610170565b905061021582826101ce565b919050565b600067ffffffffffffffff8211156102355761023461019f565b5b61023e8261018e565b9050602081019050919050565b600080604083850312156102625761026161017a565b5b600083015167ffffffffffffffff8111156102805761027f61017f565b5b61028c8582860161029f565b925050602083015167ffffffffffffffff8111156102ad576102ac61017f565b5b6102b98582860161029f565b9150509250929050565b6000819050919050565b6102d6816102c3565b82525050565b60006102e8826102c3565b91506102f3836102c3565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561032c5761032b610391565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061037757607f821691505b6020821081141561038b5761038a610337565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b61042d806103b36000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306fdde031461005c57806318160ddd1461007a57806395d89b4114610098578063a9059cbb146100b6578063dd62ed3e146100e6575b600080fd5b610064610116565b604051610071919061032f565b60405180910390f35b6100826101a4565b60405161008f9190610369565b60405180910390f35b6100a06101aa565b6040516100ad919061032f565b60405180910390f35b6100d060048036038101906100cb91906103ef565b610238565b6040516100dd919061044a565b60405180910390f35b61010060048036038101906100fb9190610465565b6102f9565b60405161010d9190610369565b60405180910390f35b6003805461012390610100565b80601f016020809104026020016040519081016040528092919081815260200182805461014f90610100565b801561019c5780601f106101715761010080835404028352916020019161019c565b820191906000526020600020905b81548152906001019060200180831161017f57829003601f168201915b505050505081565b60055481565b600480546101b790610100565b80601f01602080910402602001604051908101604052809291908181526020018280546101e390610100565b80156102305780601f1061020557610100808354040283529160200191610230565b820191906000526020600020905b81548152906001019060200180831161021357829003601f168201915b505050505081565b600081600080736b673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102c89190610159565b925050819055506001905092915050565b6001602052816000526040600020602052806000526040600020600091509150505481565b600081519050919050565b600082825260208201905092915050565b60005b8381101561032d578082015181840152602081019050610312565b8381111561033c576000848401525b50505050565b6000601f19601f8301169050919050565b600061035e826102f3565b61036881856102fe565b935061037881856020860161030f565b61038181610342565b840191505092915050565b600060208201905081810360008301526103a68184610353565b905092915050565b6000819050919050565b6103c1816103ae565b82525050565b60006020820190506103dc60008301846103b8565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610412826103e7565b9050919050565b61042281610407565b811461042d57600080fd5b50565b60008135905061043f81610419565b92915050565b61044e816103ae565b811461045957600080fd5b50565b60008135905061046b81610445565b92915050565b600080604083850312156104885761048761038d565b5b600061049685828601610430565b92505060206104a78582860161045c565b9150509250929050565b6104ba81610407565b82525050565b60006040820190506104d560008301856104b1565b6104e260208301846104b1565b9392505050565b60006104f4826103e7565b9050919050565b610504816104e9565b811461050f57600080fd5b50565b600081359050610521816104fb565b92915050565b6000806040838503121561053e5761053d61038d565b5b600061054c85828601610512565b925050602061055d85828601610512565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806105ae57607f821691505b602082108114156105c2576105c1610567565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610602826103ae565b915061060d836103ae565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610642576106416105c8565b5b828201905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061068882610407565b915061069383610407565b9250828210156106a6576106a56105c8565b5b82820390509291505056fea2646970667358221220a1b2c3d4e5f6071829394a5b6c7d8e9f0a1b2c3d4e5f6071829394a5b6c7d8e964736f6c63430008070033'
        }
    };
    
    // DOM Elements
    const deployButtons = document.querySelectorAll('.deploy-contract-btn');
    const deployedSection = document.getElementById('deployedSection');
    const deployedContractsContainer = document.getElementById('deployedContractsContainer');
    const toast = document.getElementById('toast');
    
    // Load deployed contracts from localStorage
    let deployedContracts = JSON.parse(localStorage.getItem('arcDeployedContracts') || '[]');
    
    console.log('📝 Deploy page initialized');
    console.log('📦 Loaded contracts:', deployedContracts.length);
    
    // Show toast notification
    function showToast(message, type = 'success') {
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        // Change icon based on type
        if (toastIcon) {
            if (type === 'error') {
                toastIcon.className = 'fas fa-exclamation-circle toast-icon';
                toast.style.background = '#FF5252';
            } else {
                toastIcon.className = 'fas fa-check-circle toast-icon';
                toast.style.background = '#00D4AA';
            }
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Deploy contract
    async function deployContract(contractName) {
        const contract = CONTRACTS[contractName];
        
        if (!contract) {
            showToast('Contract not found!', 'error');
            return;
        }
        
        // Check MetaMask
        if (typeof window.ethereum === 'undefined') {
            showToast('MetaMask not installed!', 'error');
            window.open('https://metamask.io/download/', '_blank');
            return;
        }
        
        try {
            const button = document.querySelector(`[data-contract="${contractName}"]`);
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deploying...';
            
            console.log('🚀 Deploying', contractName);
            
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            const from = accounts[0];
            console.log('👤 Account:', from);
            
            // Deploy transaction
            const transactionParameters = {
                from: from,
                data: contract.bytecode,
                gas: '0x100000' // 1,048,576 gas limit
            };
            
            // Send deployment transaction
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters]
            });
            
            console.log('📝 Transaction hash:', txHash);
            showToast('Transaction sent! Waiting for confirmation...');
            
            // Wait for transaction receipt
            let receipt = null;
            let attempts = 0;
            const maxAttempts = 60; // 60 seconds timeout
            
            while (!receipt && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                try {
                    receipt = await window.ethereum.request({
                        method: 'eth_getTransactionReceipt',
                        params: [txHash]
                    });
                    
                    if (receipt) {
                        console.log('✅ Receipt:', receipt);
                        break;
                    }
                } catch (err) {
                    console.log('⏳ Waiting for receipt...', attempts + 1);
                }
                
                attempts++;
            }
            
            if (!receipt) {
                throw new Error('Transaction timeout - please check explorer');
            }
            
            const contractAddress = receipt.contractAddress;
            
            if (!contractAddress) {
                throw new Error('Contract address not found in receipt');
            }
            
            console.log('🎉 Contract deployed at:', contractAddress);
            
            // Save deployed contract
            const deployedContract = {
                name: contractName,
                address: contractAddress,
                txHash: txHash,
                timestamp: Date.now(),
                abi: contract.abi
            };
            
            deployedContracts.push(deployedContract);
            localStorage.setItem('arcDeployedContracts', JSON.stringify(deployedContracts));
            
            showToast(`${contractName} deployed successfully!`);
            
            // Show deployed section and render contract
            deployedSection.style.display = 'block';
            renderDeployedContracts();
            
            // Reset button
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-check"></i> Deployed!';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-rocket"></i> Deploy Contract';
            }, 3000);
            
        } catch (error) {
            console.error('❌ Deployment failed:', error);
            
            let errorMessage = 'Deployment failed!';
            
            if (error.code === 4001) {
                errorMessage = 'You rejected the transaction';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            showToast(errorMessage, 'error');
            
            const button = document.querySelector(`[data-contract="${contractName}"]`);
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-rocket"></i> Deploy Contract';
        }
    }
    
    // Render deployed contracts
    function renderDeployedContracts() {
        if (deployedContracts.length === 0) {
            deployedSection.style.display = 'none';
            return;
        }
        
        deployedSection.style.display = 'block';
        deployedContractsContainer.innerHTML = '';
        
        deployedContracts.forEach((contract, index) => {
            const card = createDeployedContractCard(contract, index);
            deployedContractsContainer.appendChild(card);
        });
    }
    
    // Create deployed contract card
    function createDeployedContractCard(contract, index) {
        const card = document.createElement('div');
        card.className = 'deployed-contract-card';
        
        const explorerUrl = `https://testnet.arcscan.app/address/${contract.address}`;
        
        card.innerHTML = `
            <div class="deployed-contract-header">
                <div class="deployed-contract-info">
                    <h3>
                        <i class="fas fa-database"></i>
                        ${contract.name}
                        <span class="success-badge">
                            <i class="fas fa-check-circle"></i> Deployed
                        </span>
                    </h3>
                </div>
            </div>
            
            <div class="contract-address-box">
                <label>Contract Address</label>
                <div class="address-display">
                    <span class="address-text">${contract.address}</span>
                    <button class="copy-btn" onclick="copyAddress('${contract.address}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            </div>
            
            <a href="${explorerUrl}" target="_blank" class="view-explorer-btn">
                <i class="fas fa-external-link-alt"></i>
                View on Explorer
            </a>
            
            <div class="interact-section">
                <h4><i class="fas fa-hand-pointer"></i> Interact with Contract</h4>
                <div class="function-grid" id="functions-${index}">
                    ${renderFunctions(contract, index)}
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Render contract functions
    function renderFunctions(contract, contractIndex) {
        if (contract.name === 'SimpleStorage') {
            return `
                <!-- Store Function -->
                <div class="function-card">
                    <h5><i class="fas fa-save"></i> store</h5>
                    <div class="function-type">Write Function</div>
                    <div class="function-input-group">
                        <label>Number to store (uint256)</label>
                        <input 
                            type="number" 
                            class="function-input" 
                            id="store-input-${contractIndex}"
                            placeholder="Enter a number (e.g., 123)"
                            min="0"
                        >
                    </div>
                    <button 
                        class="function-btn function-btn-write" 
                        onclick="callStoreFunction(${contractIndex})"
                    >
                        <i class="fas fa-paper-plane"></i> Store Number
                    </button>
                </div>
                
                <!-- Retrieve Function -->
                <div class="function-card">
                    <h5><i class="fas fa-download"></i> retrieve</h5>
                    <div class="function-type">Read Function</div>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 15px;">
                        Get the stored number from the contract
                    </p>
                    <button 
                        class="function-btn function-btn-read" 
                        onclick="callRetrieveFunction(${contractIndex})"
                    >
                        <i class="fas fa-search"></i> Retrieve Number
                    </button>
                    <div class="function-result" id="retrieve-result-${contractIndex}">
                        Stored value: <span id="retrieve-value-${contractIndex}"></span>
                    </div>
                </div>
            `;
        }
        
        return '<p>No functions available</p>';
    }
    
    // Copy address to clipboard
    window.copyAddress = function(address) {
        navigator.clipboard.writeText(address).then(() => {
            showToast('Address copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showToast('Failed to copy address', 'error');
        });
    };
    
    // Call Store function
    window.callStoreFunction = async function(contractIndex) {
        const contract = deployedContracts[contractIndex];
        const input = document.getElementById(`store-input-${contractIndex}`);
        const value = input.value;
        
        if (!value || value.trim() === '') {
            showToast('Please enter a number', 'error');
            return;
        }
        
        // Validate it's a valid positive integer
        const numValue = parseInt(value);
        if (isNaN(numValue) || numValue < 0) {
            showToast('Please enter a valid positive number', 'error');
            return;
        }
        
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            // Encode function call for store(uint256 x)
            // Function selector: keccak256("store(uint256)") = 0x6057361d
            const functionSignature = '0x6057361d';
            
            // Convert number to hex and pad to 32 bytes (64 hex chars)
            const paddedValue = numValue.toString(16).padStart(64, '0');
            const data = functionSignature + paddedValue;
            
            console.log('📤 Calling store with value:', numValue);
            console.log('📝 Encoded data:', data);
            
            const transactionParameters = {
                from: accounts[0],
                to: contract.address,
                data: data,
                gas: '0x30000' // 196,608 gas
            };
            
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters]
            });
            
            console.log('✅ Store transaction hash:', txHash);
            showToast(`Number ${numValue} stored! TX: ${txHash.substring(0, 10)}...`);
            
            // Clear input
            input.value = '';
            
        } catch (error) {
            console.error('❌ Store failed:', error);
            
            let errorMessage = 'Failed to store number';
            if (error.code === 4001) {
                errorMessage = 'You rejected the transaction';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            showToast(errorMessage, 'error');
        }
    };
    
    // Call Retrieve function
    window.callRetrieveFunction = async function(contractIndex) {
        const contract = deployedContracts[contractIndex];
        
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            // Function selector for retrieve()
            // keccak256("retrieve()") = 0x2e64cec1
            const functionSignature = '0x2e64cec1';
            
            console.log('📥 Calling retrieve() on contract:', contract.address);
            
            const result = await window.ethereum.request({
                method: 'eth_call',
                params: [{
                    from: accounts[0],
                    to: contract.address,
                    data: functionSignature
                }, 'latest']
            });
            
            console.log('📊 Raw result:', result);
            
            // Decode result (convert hex to decimal)
            const value = parseInt(result, 16);
            
            console.log('✅ Retrieved value:', value);
            
            const resultDiv = document.getElementById(`retrieve-result-${contractIndex}`);
            const valueSpan = document.getElementById(`retrieve-value-${contractIndex}`);
            
            if (resultDiv && valueSpan) {
                valueSpan.textContent = value;
                resultDiv.classList.add('show');
            }
            
            showToast(`Retrieved value: ${value}`);
            
        } catch (error) {
            console.error('❌ Retrieve failed:', error);
            console.error('Error details:', {
                code: error.code,
                message: error.message,
                data: error.data
            });
            
            let errorMessage = 'Failed to retrieve number';
            if (error.message && error.message.includes('InvalidJump')) {
                errorMessage = 'Contract execution failed. The contract may not be deployed correctly.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            showToast(errorMessage, 'error');
        }
    };
    
    // Event Listeners
    deployButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contractName = this.getAttribute('data-contract');
            deployContract(contractName);
        });
    });
    
    // Initial render
    renderDeployedContracts();
    
    console.log('✅ Deploy page ready!');
});
