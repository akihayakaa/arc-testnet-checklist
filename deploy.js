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
                "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
                "name": "transfer",
                "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        bytecode: '0x608060405234801561001057600080fd5b506040805180820190915260098152684d79546f6b656e204d544b60b81b602082015260009061004090826101ab565b506040805180820190915260038152624d544b60e81b602082015260019061006890826101ab565b506402540be400600255600254600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610269565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100e757607f821691505b60208210810361010757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101a657600081815260208120601f850160051c810160208610156101345750805b601f850160051c820191505b8181101561015357828155600101610140565b505050505b5050565b81516001600160401b03811115610175576101756100bd565b6101898161018384546100d3565b8461010d565b602080601f8311600181146101be57600084156101a65750858301515b600019600386901b1c1916600185901b178555610153565b600085815260208120601f198616915b828110156101ed578886015182559484019460019091019084016101ce565b508582101561020b5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610399806102286000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806306fdde031461005c57806318160ddd1461007a57806370a082311461008c57806395d89b41146100b5578063a9059cbb146100bd575b600080fd5b6100646100d0565b60405161007191906102a0565b60405180910390f35b6002545b60405190815260200161007e565b61007e61009a3660046102ea565b73ffffffffffffffffffffffffffffffffffffffff1660009081526003602052604090205490565b61006461015e565b6100646100cb366004610314565b61016b565b600080546100dd9061033e565b80601f01602080910402602001604051908101604052809291908181526020018280546101099061033e565b80156101565780601f1061012b57610100808354040283529160200191610156565b820191906000526020600020905b81548152906001019060200180831161013957829003601f168201915b505050505081565b600180546100dd9061033e565b336000908152600360205260408120548211156101e1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f496e73756666696369656e7420746f6b656e2062616c616e6365000000000000604482015260640160405180910390fd5b3360009081526003602052604081208054849290610200908490610391565b909155505073ffffffffffffffffffffffffffffffffffffffff8316600090815260036020526040812080548492906102399084906103aa565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161029e91815260200190565b60405180910390a35060015b92915050565b600060208083528351808285015260005b818110156102cd578581018301518582016040015282016102b1565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b6000602082840312156102fc57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461032057600080fd5b9392505050565b80356102aa81565b6000806040838503121561034257600080fd5b823561034d816103c2565b946020939093013593505050565b600181811c9082168061036f57607f821691505b6020821081036103a857634e487b7160e01b600052602260045260246000fd5b50919050565b818103818111156102aa577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b808201808211156102aa576102aa6103b556fea26469706673582212203c4e8b9e7f1d2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6364736f6c63430008130033'
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
