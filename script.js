// Arc Testnet Checklist Application
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const checkboxes = document.querySelectorAll('.task-checkbox-input');
    const progressBar = document.getElementById('progressBar');
    const progressCounter = document.getElementById('progressCounter');
    const progressPercentage = document.getElementById('progressPercentage');
    const completionMessage = document.getElementById('completionMessage');
    const resetButton = document.getElementById('resetButton');
    const shareButton = document.getElementById('shareButton');
    const exportButton = document.getElementById('exportButton');
    const toast = document.getElementById('toast');
    
    // Stats elements
    const beginnerCompleted = document.getElementById('beginnerCompleted');
    const intermediateCompleted = document.getElementById('intermediateCompleted');
    const advancedCompleted = document.getElementById('advancedCompleted');
    
    // Task data with difficulty levels (6 tasks)
    const tasks = [
        { id: 'task1', difficulty: 'beginner', title: 'Claim Testnet USDC' },
        { id: 'task2', difficulty: 'beginner', title: 'Setup MetaMask for Arc' },
        { id: 'task3', difficulty: 'beginner', title: 'Send Test Transaction' },
        { id: 'task4', difficulty: 'intermediate', title: 'Deploy Smart Contract' },
        { id: 'task5', difficulty: 'intermediate', title: 'Interact with Contract' },
        { id: 'task6', difficulty: 'beginner', title: 'Share Experience' }
    ];
    
    console.log('✅ Arc Testnet Checklist - Initialized');
    console.log('📊 Total tasks:', tasks.length);
    console.log('📋 Total checkboxes:', checkboxes.length);
    
    // Messages for different progress levels
    const messages = [
        { min: 0, max: 0, text: "Start checking tasks to track your progress!" },
        { min: 1, max: 2, text: "Great start! You're getting familiar with Arc testnet." },
        { min: 3, max: 4, text: "Excellent progress! You're becoming an Arc power user." },
        { min: 5, max: 5, text: "Almost there! One more task to complete." },
        { min: 6, max: 6, text: "🎉 Congratulations! You've completed all Arc testnet tasks!" }
    ];
    
    // Initialize from localStorage or set defaults
    function initializeChecklist() {
        const savedState = localStorage.getItem('arcChecklistState');
        
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                console.log('💾 Loaded saved progress');
                
                checkboxes.forEach(checkbox => {
                    if (state[checkbox.id]) {
                        checkbox.checked = true;
                    }
                });
            } catch (error) {
                console.error('❌ Error loading saved state:', error);
                localStorage.removeItem('arcChecklistState');
            }
        }
        
        updateProgress();
    }
    
    // Update progress bar and counters
    function updateProgress() {
        const totalTasks = checkboxes.length;
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percentage = (completedTasks / totalTasks) * 100;
        
        // Update progress bar
        progressBar.style.width = `${percentage}%`;
        
        // Update counter
        progressCounter.textContent = `${completedTasks}/${totalTasks} tasks completed`;
        
        // Update percentage
        progressPercentage.textContent = `${Math.round(percentage)}%`;
        
        // Update completion message
        const message = messages.find(m => completedTasks >= m.min && completedTasks <= m.max);
        if (message) {
            completionMessage.textContent = message.text;
        }
        
        // Update stats by difficulty
        updateDifficultyStats();
        
        // Save state to localStorage
        saveState();
        
        console.log(`📊 Progress: ${completedTasks}/${totalTasks} (${Math.round(percentage)}%)`);
    }
    
    // Update difficulty statistics
    function updateDifficultyStats() {
        let beginnerCount = 0;
        let intermediateCount = 0;
        let advancedCount = 0;
        
        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const task = tasks[index];
                if (task) {
                    if (task.difficulty === 'beginner') {
                        beginnerCount++;
                    } else if (task.difficulty === 'intermediate') {
                        intermediateCount++;
                    } else if (task.difficulty === 'advanced') {
                        advancedCount++;
                    }
                }
            }
        });
        
        // Update stats display
        if (beginnerCompleted) beginnerCompleted.textContent = beginnerCount;
        if (intermediateCompleted) intermediateCompleted.textContent = intermediateCount;
        if (advancedCompleted) advancedCompleted.textContent = advancedCount;
        
        console.log(`🏆 Stats - Beginner: ${beginnerCount}, Intermediate: ${intermediateCount}, Advanced: ${advancedCount}`);
    }
    
    // Save checklist state to localStorage
    function saveState() {
        const state = {};
        checkboxes.forEach(checkbox => {
            state[checkbox.id] = checkbox.checked;
        });
        
        try {
            localStorage.setItem('arcChecklistState', JSON.stringify(state));
        } catch (error) {
            console.error('❌ Error saving to localStorage:', error);
        }
    }
    
    // Show toast notification
    function showToast(message) {
        if (!toast) return;
        
        const toastMessage = toast.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Reset all checkboxes
    function resetChecklist() {
        if (confirm('Are you sure you want to reset all progress?')) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            updateProgress();
            showToast('All progress reset!');
        }
    }
    
    // Share progress
    function shareProgress() {
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        const percentage = Math.round((completedTasks / totalTasks) * 100);
        
        const shareText = `🚀 I've completed ${completedTasks}/${totalTasks} tasks (${percentage}%) on the Arc Testnet Checklist!\n\nCheck it out: ${window.location.href}\n\n#ArcTestnet #BuildOnArc`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Arc Testnet Progress',
                text: shareText,
                url: window.location.href
            }).then(() => {
                console.log('✅ Share successful');
            }).catch(error => {
                console.log('❌ Share cancelled or failed:', error);
            });
        } else {
            // Fallback to Twitter
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            window.open(twitterUrl, '_blank');
        }
        
        showToast('Sharing your progress!');
    }
    
    // Export tasks as text
    function exportTasks() {
        const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalTasks = checkboxes.length;
        
        let exportText = `Arc Testnet Checklist Progress\n`;
        exportText += `Generated: ${new Date().toLocaleDateString()}\n`;
        exportText += `Progress: ${completedTasks}/${totalTasks} tasks (${Math.round((completedTasks/totalTasks)*100)}%)\n\n`;
        
        exportText += 'TASKS:\n';
        exportText += '------\n';
        
        checkboxes.forEach((checkbox, index) => {
            const task = tasks[index];
            const status = checkbox.checked ? '✅' : '⬜';
            const taskTitle = task ? task.title : `Task ${index + 1}`;
            exportText += `${status} ${taskTitle}\n`;
        });
        
        exportText += '\n------\n';
        exportText += `Live at: ${window.location.href}\n`;
        exportText += 'Made by aki hayaka';
        
        // Create download link
        const blob = new Blob([exportText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'arc-testnet-checklist-progress.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Tasks exported!');
        console.log('📄 Tasks exported successfully');
    }
    
    // Event Listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            showToast('Progress updated!');
        });
    });
    
    // Add event listeners for buttons
    if (resetButton) {
        resetButton.addEventListener('click', resetChecklist);
    }
    
    if (shareButton) {
        shareButton.addEventListener('click', shareProgress);
    }
    
    if (exportButton) {
        exportButton.addEventListener('click', exportTasks);
    }
    
    // Task card click (toggles checkbox)
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on checkbox, button, or link
            if (!e.target.closest('.task-checkbox') && 
                !e.target.closest('button') && 
                !e.target.closest('a')) {
                const checkbox = this.querySelector('.task-checkbox-input');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        });
    });
    
    // Tweet Now Button - Task 6
    const tweetNowBtn = document.getElementById('tweetNowBtn');
    if (tweetNowBtn) {
        tweetNowBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            
            // Calculate progress for personalized tweet
            const completedTasks = Array.from(checkboxes).filter(cb => cb.checked).length;
            const totalTasks = checkboxes.length;
            const percentage = Math.round((completedTasks / totalTasks) * 100);
            
            // Tweet templates based on progress
            let tweetText = '';
            
            if (completedTasks === 0) {
                // Just started
                tweetText = `🚀 Just started my journey on @arc Testnet!\n\nExploring the ecosystem and learning about blockchain development. Let's go! 💪\n\n#ArcTestnet #BuildOnArc`;
            } else if (completedTasks < totalTasks) {
                // In progress
                tweetText = `⚡ Making progress on @arc Testnet!\n\n✅ Completed ${completedTasks}/${totalTasks} tasks (${percentage}%)\n\nThe tools and ecosystem are amazing. Excited to learn more! 🔥\n\n#ArcTestnet #BuildOnArc`;
            } else {
                // Completed all tasks
                tweetText = `🎉 Completed all ${totalTasks} tasks on @arc Testnet!\n\n✅ Claimed USDC\n✅ Set up MetaMask\n✅ Sent transactions\n✅ Deployed smart contract\n✅ Interacted with contracts\n\nReady to build on Arc! 🚀\n\n#ArcTestnet #BuildOnArc`;
            }
            
            // Create Twitter Intent URL
            const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
            
            // Open Twitter in new window
            window.open(twitterIntentUrl, '_blank', 'width=550,height=420');
            
            console.log('🐦 Opening Twitter Intent');
            showToast('Opening Twitter... Share your journey!');
            
            // Auto-check task 6 after a delay (assuming they will tweet)
            setTimeout(() => {
                const task6Checkbox = document.getElementById('task6');
                if (task6Checkbox && !task6Checkbox.checked) {
                    task6Checkbox.checked = true;
                    task6Checkbox.dispatchEvent(new Event('change'));
                }
            }, 2000);
        });
    }
    
    // Add Arc to MetaMask button
    const addArcButton = document.getElementById('addArcToMetaMask');
    if (addArcButton) {
        addArcButton.addEventListener('click', async function(e) {
            e.stopPropagation(); // Prevent card click
            
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                alert('MetaMask is not installed! Please install MetaMask extension first.\n\nVisit: https://metamask.io/download/');
                window.open('https://metamask.io/download/', '_blank');
                return;
            }
            
            try {
                // Arc Testnet configuration - OFFICIAL DATA
                const arcTestnetParams = {
                    chainId: '0x4CEF52', // 5042002 in hex
                    chainName: 'Arc Testnet',
                    nativeCurrency: {
                        name: 'USDC',
                        symbol: 'USDC',
                        decimals: 18
                    },
                    rpcUrls: ['https://rpc.testnet.arc.network'],
                    blockExplorerUrls: ['https://testnet.arcscan.app']
                };
                
                console.log('🦊 Adding Arc Testnet to MetaMask...');
                addArcButton.disabled = true;
                addArcButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
                
                // Request to add the network
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [arcTestnetParams]
                });
                
                console.log('✅ Arc Testnet added successfully!');
                showToast('Arc Testnet added to MetaMask!');
                addArcButton.innerHTML = '<i class="fas fa-check"></i> Added Successfully!';
                
                // Auto check the task after 2 seconds
                setTimeout(() => {
                    const task2Checkbox = document.getElementById('task2');
                    if (task2Checkbox && !task2Checkbox.checked) {
                        task2Checkbox.checked = true;
                        task2Checkbox.dispatchEvent(new Event('change'));
                    }
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        addArcButton.disabled = false;
                        addArcButton.innerHTML = '<i class="fab fa-ethereum"></i> Add Arc to MetaMask';
                    }, 3000);
                }, 2000);
                
            } catch (error) {
                console.error('❌ Error adding Arc Testnet:', error);
                
                let errorMessage = 'Failed to add Arc Testnet to MetaMask.';
                
                if (error.code === 4001) {
                    errorMessage = 'You rejected the request. Please try again.';
                } else if (error.code === -32002) {
                    errorMessage = 'Request already pending. Please check MetaMask.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                showToast(errorMessage);
                addArcButton.disabled = false;
                addArcButton.innerHTML = '<i class="fab fa-ethereum"></i> Add Arc to MetaMask';
            }
        });
    } else {
        console.warn('⚠️ Add Arc to MetaMask button not found');
    }
    
    // Send to Frens Modal Functionality
    const sendToFrensBtn = document.getElementById('sendToFrensBtn');
    const sendUsdcModal = document.getElementById('sendUsdcModal');
    const closeSendModal = document.getElementById('closeSendModal');
    const recipientAddress = document.getElementById('recipientAddress');
    const amountButtons = document.querySelectorAll('.amount-btn');
    const confirmSendBtn = document.getElementById('confirmSendBtn');
    const summaryAmount = document.getElementById('summaryAmount');
    
    let selectedAmount = null;
    
    // Suggested wallet address
    const SUGGESTED_WALLET = '0x029E4b42a02108429Ea1Eb9f230Ebf9c4B5cf263';
    
    // Copy suggested address to clipboard
    window.copySuggestedAddress = function() {
        navigator.clipboard.writeText(SUGGESTED_WALLET).then(() => {
            showToast('Wallet address copied to clipboard!');
            console.log('📋 Copied suggested address:', SUGGESTED_WALLET);
        }).catch(err => {
            console.error('Failed to copy:', err);
            showToast('Failed to copy address', 'error');
        });
    };
    
    // Use suggested address (fill input)
    window.useSuggestedAddress = function() {
        recipientAddress.value = SUGGESTED_WALLET;
        validateForm();
        showToast('Address filled! Now select an amount.');
        console.log('✅ Using suggested address');
    };
    
    // USDC Contract Address on Arc Testnet (Native USDC)
    const USDC_CONTRACT = '0x0000000000000000000000000000000000000000'; // Native USDC on Arc
    
    // Open modal
    if (sendToFrensBtn) {
        sendToFrensBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                alert('MetaMask is not installed! Please install MetaMask extension first.\n\nVisit: https://metamask.io/download/');
                window.open('https://metamask.io/download/', '_blank');
                return;
            }
            
            sendUsdcModal.classList.add('show');
            console.log('📤 Send to Frens modal opened');
        });
    }
    
    // Close modal
    if (closeSendModal) {
        closeSendModal.addEventListener('click', function() {
            sendUsdcModal.classList.remove('show');
            resetSendForm();
        });
    }
    
    // Close modal when clicking outside
    sendUsdcModal.addEventListener('click', function(e) {
        if (e.target === sendUsdcModal) {
            sendUsdcModal.classList.remove('show');
            resetSendForm();
        }
    });
    
    // Amount button selection
    amountButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            amountButtons.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Update selected amount
            selectedAmount = this.getAttribute('data-amount');
            summaryAmount.textContent = `${selectedAmount} USDC`;
            
            // Check if form is valid
            validateForm();
            
            console.log('💰 Selected amount:', selectedAmount, 'USDC');
        });
    });
    
    // Validate recipient address input
    recipientAddress.addEventListener('input', function() {
        validateForm();
    });
    
    // Form validation
    function validateForm() {
        const address = recipientAddress.value.trim();
        const isValidAddress = address.length === 42 && address.startsWith('0x');
        const hasAmount = selectedAmount !== null;
        
        if (isValidAddress && hasAmount) {
            confirmSendBtn.disabled = false;
        } else {
            confirmSendBtn.disabled = true;
        }
    }
    
    // Reset form
    function resetSendForm() {
        recipientAddress.value = '';
        selectedAmount = null;
        summaryAmount.textContent = '0 USDC';
        amountButtons.forEach(b => b.classList.remove('selected'));
        confirmSendBtn.disabled = true;
    }
    
    // Send transaction
    if (confirmSendBtn) {
        confirmSendBtn.addEventListener('click', async function() {
            const recipient = recipientAddress.value.trim();
            
            if (!recipient || !selectedAmount) {
                showToast('Please fill in all fields');
                return;
            }
            
            try {
                confirmSendBtn.disabled = true;
                confirmSendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                console.log('💸 Sending', selectedAmount, 'USDC to', recipient);
                
                // Request account access
                const accounts = await window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                });
                
                const from = accounts[0];
                
                // Convert amount to Wei (18 decimals for USDC on Arc)
                const amountInWei = '0x' + (parseFloat(selectedAmount) * Math.pow(10, 18)).toString(16);
                
                // Since USDC is the native currency on Arc Testnet, we use simple ETH transfer
                const transactionParameters = {
                    from: from,
                    to: recipient,
                    value: amountInWei,
                    chainId: '0x4CEF52' // Arc Testnet
                };
                
                console.log('📝 Transaction params:', transactionParameters);
                
                // Send transaction
                const txHash = await window.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters]
                });
                
                console.log('✅ Transaction sent! Hash:', txHash);
                
                // Close modal
                sendUsdcModal.classList.remove('show');
                resetSendForm();
                
                // Show success message
                showToast(`Transaction sent! Hash: ${txHash.substring(0, 10)}...`);
                
                // Auto-check task 3
                setTimeout(() => {
                    const task3Checkbox = document.getElementById('task3');
                    if (task3Checkbox && !task3Checkbox.checked) {
                        task3Checkbox.checked = true;
                        task3Checkbox.dispatchEvent(new Event('change'));
                    }
                }, 2000);
                
                // Reset button
                confirmSendBtn.disabled = false;
                confirmSendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Transaction';
                
            } catch (error) {
                console.error('❌ Transaction failed:', error);
                
                let errorMessage = 'Transaction failed!';
                
                if (error.code === 4001) {
                    errorMessage = 'You rejected the transaction.';
                } else if (error.code === -32002) {
                    errorMessage = 'Request already pending in MetaMask.';
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                showToast(errorMessage);
                
                confirmSendBtn.disabled = false;
                confirmSendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Transaction';
            }
        });
    }
    
    // Initialize the checklist
    initializeChecklist();
    
    console.log('🎉 Arc Testnet Checklist ready!');
});
