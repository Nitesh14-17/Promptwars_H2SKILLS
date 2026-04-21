document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // 2. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. Process Section Logic
    const processData = [
        {
            title: "Voter Registration",
            icon: "fa-id-card",
            desc: "The first and most crucial step. You must be registered in the electoral roll to cast a vote. This involves verifying your identity, age, and residency.",
            example: "Example: Filling out a form online or at a local government office with your ID proof to get your Voter ID card."
        },
        {
            title: "Candidate Nomination",
            icon: "fa-user-tie",
            desc: "Individuals or political party representatives officially declare their intention to run for an office. They submit nomination papers to the election commission.",
            example: "Example: A local leader filing paperwork to become the official mayoral candidate for their city."
        },
        {
            title: "Campaigning",
            icon: "fa-bullhorn",
            desc: "Candidates reach out to voters to explain their platform, promises, and policies. This includes rallies, debates, advertisements, and door-to-door visits.",
            example: "Example: Watching a televised debate between candidates discussing their plans for improving local schools."
        },
        {
            title: "Voting Process",
            icon: "fa-person-booth",
            desc: "Election Day! Registered voters go to designated polling stations to cast their votes using electronic voting machines (EVMs) or paper ballots securely.",
            example: "Example: Standing in line at a local school on election day to privately cast your vote."
        },
        {
            title: "Counting & Results",
            icon: "fa-chart-pie",
            desc: "After polls close, votes are securely transported and counted by election officials. The candidate with the most valid votes is declared the winner.",
            example: "Example: Watching the news as they announce the final vote counts and declare the new mayor."
        }
    ];

    const processCard = document.getElementById('process-card');
    const stepItems = document.querySelectorAll('.step-item');
    const nextStepBtn = document.getElementById('next-step-btn');
    let currentProcessStep = 0;

    function renderProcessStep(index) {
        const data = processData[index];
        processCard.innerHTML = `
            <h3><i class="fa-solid ${data.icon}"></i> ${data.title}</h3>
            <p>${data.desc}</p>
            <div class="process-example">
                <strong><i class="fa-solid fa-lightbulb" style="color: #eab308;"></i> Real-life Context:</strong><br>
                ${data.example}
            </div>
        `;
        
        stepItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        currentProcessStep = index;

        if (index === processData.length - 1) {
            nextStepBtn.style.display = 'none';
        } else {
            nextStepBtn.style.display = 'inline-block';
        }
    }

    stepItems.forEach((item, index) => {
        item.addEventListener('click', () => renderProcessStep(index));
    });

    nextStepBtn.addEventListener('click', () => {
        if (currentProcessStep < processData.length - 1) {
            renderProcessStep(currentProcessStep + 1);
        }
    });

    // Initialize first step
    renderProcessStep(0);

    // 4. Timeline Animation
    const simulateBtn = document.getElementById('simulate-timeline');
    const timelineSection = document.getElementById('timeline');
    const timelineNodes = document.querySelectorAll('.timeline-node');

    simulateBtn.addEventListener('click', () => {
        timelineSection.classList.add('simulating');
        timelineNodes.forEach(n => n.classList.remove('active'));
        
        setTimeout(() => timelineNodes[0].classList.add('active'), 500);
        setTimeout(() => timelineNodes[1].classList.add('active'), 1500);
        setTimeout(() => timelineNodes[2].classList.add('active'), 2500);

        setTimeout(() => {
            timelineSection.classList.remove('simulating');
        }, 4000);
    });

    // 5. Chat Assistant Logic
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatWindow = document.getElementById('chat-window');
    const suggestBtns = document.querySelectorAll('.suggest-btn');

    const botResponses = {
        "register": "To register to vote, you typically need to fill out a registration form online or at your local election office, providing proof of identity and age (must be 18+).",
        "nota": "NOTA stands for 'None of the Above'. It is a ballot option that allows a voter to indicate disapproval of all the candidates in a voting system.",
        "counted": "After votes are counted by election officials, the results are officially certified. The winner is declared and subsequently inaugurated or sworn into office.",
        "evm": "EVM stands for Electronic Voting Machine. It's a secure device used to digitally record and count votes.",
        "default": "That's a great question about elections! While I'm a simple demo bot right now, you can find more detailed answers in our FAQ section or by checking your local government's official election website."
    };

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(isUser ? 'user-msg' : 'assistant-msg');
        msgDiv.innerText = text;
        chatWindow.appendChild(msgDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function handleChat() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, true);
        chatInput.value = '';

        // Simulate thinking
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response = botResponses.default;
            
            for (let key in botResponses) {
                if (lowerText.includes(key)) {
                    response = botResponses[key];
                    break;
                }
            }
            addMessage(response, false);
        }, 600);
    }

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    suggestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.innerText;
            handleChat();
        });
    });

    // 6. Quiz Logic
    const quizData = [
        {
            q: "What is the minimum voting age in most democratic countries?",
            options: ["16", "18", "21", "25"],
            answer: 1,
            explanation: "In most democratic nations, the legal voting age is 18 years old."
        },
        {
            q: "What does EVM stand for?",
            options: ["Electronic Voting Machine", "Election Validation Mechanism", "Electoral Vote Monitor", "Early Voting Method"],
            answer: 0,
            explanation: "EVM stands for Electronic Voting Machine, used for electronic casting and counting of votes."
        },
        {
            q: "Which step comes immediately after Campaigning?",
            options: ["Voter Registration", "Candidate Nomination", "Voting Process", "Counting"],
            answer: 2,
            explanation: "After the campaign period ends, citizens proceed to the Voting Process to cast their ballots."
        },
        {
            q: "What does NOTA allow voters to do?",
            options: ["Vote for multiple candidates", "Reject all candidates", "Register online", "Vote early"],
            answer: 1,
            explanation: "NOTA (None of the Above) allows voters to formally reject all candidates on the ballot."
        },
        {
            q: "Who is responsible for overseeing the election process?",
            options: ["The Police", "The Current Government", "The Supreme Court", "The Election Commission"],
            answer: 3,
            explanation: "An independent Election Commission is typically responsible for conducting free and fair elections."
        }
    ];

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizIntro = document.getElementById('quiz-intro');
    const quizArea = document.getElementById('quiz-area');
    const quizResult = document.getElementById('quiz-result');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizProgressText = document.getElementById('quiz-progress-text');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    
    let currentQuizIndex = 0;
    let score = 0;
    let quizActive = false;

    startQuizBtn.addEventListener('click', () => {
        quizIntro.classList.add('hidden');
        quizArea.classList.remove('hidden');
        currentQuizIndex = 0;
        score = 0;
        loadQuestion();
    });

    function loadQuestion() {
        quizActive = true;
        quizFeedback.classList.add('hidden');
        nextQuestionBtn.classList.add('hidden');
        
        const qData = quizData[currentQuizIndex];
        questionText.innerText = qData.q;
        optionsContainer.innerHTML = '';
        
        quizProgressText.innerText = `Question ${currentQuizIndex + 1} of ${quizData.length}`;
        quizProgressFill.style.width = `${((currentQuizIndex + 1) / quizData.length) * 100}%`;

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.innerText = opt;
            btn.addEventListener('click', () => handleAnswer(index, btn));
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex, selectedBtn) {
        if (!quizActive) return;
        quizActive = false;

        const qData = quizData[currentQuizIndex];
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === qData.answer) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex) {
                btn.classList.add('wrong');
            }
        });

        quizFeedback.classList.remove('hidden');
        if (selectedIndex === qData.answer) {
            score++;
            quizFeedback.innerHTML = `<strong>Correct!</strong> <br> ${qData.explanation}`;
            quizFeedback.style.borderLeft = "4px solid var(--success)";
        } else {
            quizFeedback.innerHTML = `<strong>Incorrect.</strong> <br> ${qData.explanation}`;
            quizFeedback.style.borderLeft = "4px solid var(--error)";
        }

        nextQuestionBtn.classList.remove('hidden');
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuizIndex++;
        if (currentQuizIndex < quizData.length) {
            loadQuestion();
        } else {
            showQuizResults();
        }
    });

    function showQuizResults() {
        quizArea.classList.add('hidden');
        quizResult.classList.remove('hidden');
        
        document.getElementById('score-text').innerText = `You scored ${score} out of ${quizData.length}`;
        
        const badgeContainer = document.getElementById('badge-container');
        if (score === quizData.length) {
            badgeContainer.innerHTML = '🏆<br><span style="font-size:1.5rem">Election Expert</span>';
        } else if (score >= 3) {
            badgeContainer.innerHTML = '🎖️<br><span style="font-size:1.5rem">Civic Scholar</span>';
        } else {
            badgeContainer.innerHTML = '📚<br><span style="font-size:1.5rem">Learner</span>';
        }
    }

    document.getElementById('restart-quiz-btn').addEventListener('click', () => {
        quizResult.classList.add('hidden');
        quizIntro.classList.remove('hidden');
    });

    // 7. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

});
