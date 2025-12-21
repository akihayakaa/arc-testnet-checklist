// Arc Testnet Checklist - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const checkboxes = ['t1', 't2', 't3', 't4', 't5', 't6'].map(id => document.getElementById(id));
    const progressFill = document.getElementById('progressFill');
    const progressStats = document.getElementById('progressStats');
    const progressLabel = document.getElementById('progressLabel');
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    const sendModal = document.getElementById('sendModal');
    const addressInput = document.getElementById('addressInput');
    const summaryAmt = document.getElementById('summaryAmt');
    const confirmTxBtn = document.getElementById('confirmTxBtn');

    // Progress labels
    const labels = [
        'Get started',
        'Good start',
        'Halfway there',
        'Almost done',
        'One more',
        'Completed! 🎉'
    ];

    let selectedAmount = null;

    // Initialize
    function load() {
        const data = localStorage.getItem('arcProgress');
        if (data) {
            try {
                const state = JSON.parse(data);
                checkboxes.forEach((cb, i) => {
                    if (state[i]) cb.checked = true;
                });
            } catch (error) {
                console.error('Error loading progress:', error);
            }
        }
        update();
    }

    // Update progress
    function update() {
        const done = checkboxes.filter(cb => cb.checked).length;
        const pct = (done / 6) * 100;
        
        progressFill.style.width = `${pct}%`;
        progressStats.textContent = `${done}/6`;
        progressLabel.textContent = labels[done];
        
        save();
    }

    // Save to localStorage
    function save() {
        const state = checkboxes.map(cb => cb.checked);
        localStorage.setItem('arcProgress', JSON.stringify(state));
    }

    // Show toast notification
    function notify(msg) {
        toastText.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Task card clicks
    document.querySelectorAll('.task').forEach((task, i) => {
        task.addEventListener('click', (e) => {
            if (!e.target.closest('.task-action')) {
                checkboxes[i].checked = !checkboxes[i].checked;
                update();
                notify('Progress updated');
            }
        });
    });

    // Checkbox changes
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            update();
            notify('Progress updated');
        });
    });

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Reset all progress?')) {
            checkboxes.forEach(cb => cb.checked = false);
            update();
            notify('Progress reset');
        }
    });

    // Share button
    document.getElementById('shareBtn').addEventListener('click', () => {
        const done = checkboxes.filter(cb => cb.checked).length;
        const msg = `I completed ${done}/6 tasks on Arc Testnet! #ArcTestnet #BuildOnArc`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Arc Testnet Progress',
                text: msg
            }).catch(err => console.log('Share cancelled'));
        } else {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(msg)}`, '_blank');
        }
        notify('Sharing...');
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', () => {
        const done = checkboxes.filter(cb => cb.checked).length;
        let txt = `Arc Testnet Progress\n`;
        txt += `Date: ${new Date().toLocaleDateString()}\n`;
        txt += `Completed: ${done}/6 tasks\n\n`;
        
        const taskNames = [
            'Claim Testnet USDC',
            'Setup MetaMask',
            'Send Test Transaction',
            'Deploy Smart Contract',
            'Interact with Contract',
            'Share Experience'
        ];

        checkboxes.forEach((cb, i) => {
            txt += `${cb.checked ? '✓' : '○'} ${taskNames[i]}\n`;
        });
        
        txt += `\nMade by aki hayaka`;

        const blob = new Blob([txt], {type: 'text/plain'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'arc-testnet-progress.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        
        notify('Progress exported');
    });

    // Add Network Button
    document.getElementById('addNetworkBtn').addEventListener('click', async () => {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed! Please install MetaMask extension first.');
            window.open('https://metamask.io/download/', '_blank');
            return;
        }

        try {
            const btn = document.getElementById('addNetworkBtn');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x4CEF52', // 5042002 in hex
                    chainName: 'Arc Testnet',
                    nativeCurrency: {
                        name: 'USDC',
                        symbol: 'USDC',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.testnet.arc.network'],
                    blockExplorerUrls: ['https://testnet.arcscan.app']
                }]
            });

            notify('Network added successfully!');
            btn.innerHTML = '<i class="fas fa-check"></i> Added!';

            // Auto-check task 2
            setTimeout(() => {
                const t2 = document.getElementById('t2');
                if (!t2.checked) {
                    t2.checked = true;
                    update();
                }
            }, 1000);

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = '<i class="fab fa-ethereum"></i> Add Network';
            }, 3000);

        } catch (error) {
            console.error('Error adding network:', error);
            
            let errorMsg = 'Failed to add network';
            if (error.code === 4001) {
                errorMsg = 'Request rejected';
            } else if (error.code === -32002) {
                errorMsg = 'Request pending in MetaMask';
            }
            
            notify(errorMsg);
            
            const btn = document.getElementById('addNetworkBtn');
            btn.disabled = false;
            btn.innerHTML = '<i class="fab fa-ethereum"></i> Add Network';
        }
    });

    // Send Transaction Button
    document.getElementById('sendTxBtn').addEventListener('click', () => {
        if (typeof window.ethereum === 'undefined') {
            alert('MetaMask is not installed! Please install MetaMask extension first.');
            window.open('https://metamask.io/download/', '_blank');
            return;
        }
        
        sendModal.classList.add('active');
    });

    // Close Modal
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        sendModal.classList.remove('active');
        resetModal();
    });

    // Close modal on backdrop click
    sendModal.addEventListener('click', (e) => {
        if (e.target === sendModal) {
            sendModal.classList.remove('active');
            resetModal();
        }
    });

    // Amount selection
    document.querySelectorAll('.amount-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.amount-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedAmount = btn.getAttribute('data-val');
            summaryAmt.textContent = `${selectedAmount} USDC`;
            validateModal();
        });
    });

    // Address input
    addressInput.addEventListener('input', validateModal);

    // Validate modal form
    function validateModal() {
        const address = addressInput.value.trim();
        const isValid = address.length === 42 && address.startsWith('0x') && selectedAmount;
        confirmTxBtn.disabled = !isValid;
    }

    // Reset modal
    function resetModal() {
        addressInput.value = '';
        selectedAmount = null;
        summaryAmt.textContent = '0 USDC';
        document.querySelectorAll('.amount-option').forEach(b => b.classList.remove('selected'));
        confirmTxBtn.disabled = true;
    }

    // Confirm transaction
    confirmTxBtn.addEventListener('click', async () => {
        const recipient = addressInput.value.trim();
        
        if (!recipient || !selectedAmount) {
            notify('Please fill all fields');
            return;
        }

        try {
            confirmTxBtn.disabled = true;
            confirmTxBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            const from = accounts[0];

            // Convert amount to Wei (18 decimals)
            const amountInWei = '0x' + (parseFloat(selectedAmount) * Math.pow(10, 18)).toString(16);

            // Send transaction
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: from,
                    to: recipient,
                    value: amountInWei,
                    chainId: '0x4CEF52'
                }]
            });

            console.log('Transaction sent:', txHash);

            sendModal.classList.remove('active');
            resetModal();
            notify(`Transaction sent! ${txHash.substring(0, 10)}...`);

            // Auto-check task 3
            setTimeout(() => {
                const t3 = document.getElementById('t3');
                if (!t3.checked) {
                    t3.checked = true;
                    update();
                }
            }, 2000);

            confirmTxBtn.disabled = false;
            confirmTxBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Transaction';

        } catch (error) {
            console.error('Transaction failed:', error);
            
            let errorMsg = 'Transaction failed';
            if (error.code === 4001) {
                errorMsg = 'Transaction rejected';
            } else if (error.code === -32002) {
                errorMsg = 'Request pending in MetaMask';
            } else if (error.message) {
                errorMsg = error.message.substring(0, 50);
            }
            
            notify(errorMsg);
            
            confirmTxBtn.disabled = false;
            confirmTxBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Transaction';
        }
    });

    // Initialize on load
    load();
    
    console.log('Arc Testnet Checklist - Ready!');
});
