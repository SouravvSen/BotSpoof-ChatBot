const knowledgeBase = [
    // --- INDIA ---
    { keywords: ["india", "bharat"], response: "India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area and the most populous country in the world." },
    { keywords: ["capital of india", "new delhi"], response: "The capital of India is New Delhi." },
    { keywords: ["prime minister of india", "modi"], response: "The current Prime Minister of India is Narendra Modi." },
    { keywords: ["independence day", "15 august"], response: "India gained independence from British rule on August 15, 1947." },
    { keywords: ["taj mahal"], response: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan." },
    { keywords: ["indian economy"], response: "India has the world's fifth-largest economy by nominal GDP and the third-largest by purchasing power parity (PPP)." },
    { keywords: ["ganges", "ganga"], response: "The Ganges is a trans-boundary river of Asia which flows through India and Bangladesh. It is the most sacred river to Hindus." },

    // --- SCIENCE ---
    { keywords: ["science", "what is science"], response: "Science is a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe." },
    { keywords: ["physics"], response: "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force." },
    { keywords: ["chemistry"], response: "Chemistry is the scientific study of the properties and behavior of matter. It covers the elements that make up matter to the compounds made of atoms, molecules and ions." },
    { keywords: ["biology"], response: "Biology is the scientific study of life. It is a natural science with a broad scope but has several unifying themes that tie it together as a single, coherent field." },
    { keywords: ["einstein", "relativity"], response: "Albert Einstein is best known for developing the theory of relativity, which revolutionized our understanding of space, time, and gravity." },
    { keywords: ["gravity", "newton"], response: "Gravity is a fundamental interaction which causes mutual attraction between all things with mass or energy. Isaac Newton formulated the law of universal gravitation." },
    { keywords: ["dna"], response: "DNA, or deoxyribonucleic acid, is a molecule that carries the genetic instructions used in the growth, development, functioning, and reproduction of all known organisms." },

    // --- COMPUTER SCIENCE ---
    { keywords: ["computer science", "cs"], response: "Computer science is the study of computation, information, and automation. It spans theoretical disciplines to applied disciplines." },
    { keywords: ["algorithm"], response: "An algorithm is a finite sequence of rigorous instructions, typically used to solve a class of specific problems or to perform a computation." },
    { keywords: ["data structure"], response: "In computer science, a data structure is a data organization, management, and storage format that is usually chosen for efficient access to data." },
    { keywords: ["artificial intelligence", "ai"], response: "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans." },
    { keywords: ["python"], response: "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation." },
    { keywords: ["javascript", "js"], response: "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript specification. It is one of the core technologies of the World Wide Web." },
    { keywords: ["operating system", "os"], response: "An operating system is system software that manages computer hardware, software resources, and provides common services for computer programs." },
    { keywords: ["internet"], response: "The Internet is a global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link devices worldwide." },
    { keywords: ["database", "db"], response: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system." },
    { keywords: ["cloud computing", "aws", "azure"], response: "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user." },
    { keywords: ["machine learning", "ml"], response: "Machine learning is a field of inquiry devoted to understanding and building methods that 'learn', that is, methods that leverage data to improve performance on some set of tasks." },
    { keywords: ["cybersecurity", "hacking", "security"], response: "Cybersecurity is the protection of computer systems and networks from attacks by malicious actors that may result in unauthorized information disclosure, theft of, or damage to hardware or software." },
    { keywords: ["blockchain", "bitcoin", "crypto"], response: "A blockchain is a distributed ledger with growing lists of records (blocks) that are securely linked together via cryptographic hashes." },
    { keywords: ["software engineering", "sdlc"], response: "Software engineering is a systematic engineering approach to software development. It involves the design, development, maintenance, testing, and evaluation of computer software." },
    { keywords: ["git", "github", "version control"], response: "Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code." },
    { keywords: ["react", "frontend framework"], response: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta." },
    { keywords: ["node", "nodejs", "backend js"], response: "Node.js is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. It allows developers to use JS for server-side scripting." },
    { keywords: ["big data"], response: "Big data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software." },
    { keywords: ["compiler", "interpreter"], response: "A compiler is a computer program that translates computer code written in one programming language into another language. An interpreter directly executes instructions in a programming or scripting language." },
    { keywords: ["api", "rest", "graphql"], response: "An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other." },

    // --- WORLD ---
    { keywords: ["world", "earth"], response: "Earth is the third planet from the Sun and the only astronomical object known to harbor life." },
    { keywords: ["continent", "how many continents"], response: "There are generally considered to be seven continents: Africa, Antarctica, Asia, Australia/Oceania, Europe, North America, and South America." },
    { keywords: ["united nations", "un"], response: "The United Nations is an intergovernmental organization whose stated purposes are to maintain international peace and security and develop friendly relations among nations." },
    { keywords: ["population of the world"], response: "As of 2024, the world population is estimated to be over 8 billion people." },
    { keywords: ["amazon rainforest"], response: "The Amazon rainforest is the world's largest tropical rainforest, famed for its biodiversity. It is located in South America." },
    { keywords: ["mount everest"], response: "Mount Everest is Earth's highest mountain above sea level, located in the Himalayas on the border between Nepal and China." },
    { keywords: ["ocean", "pacific ocean"], response: "The Pacific Ocean is the largest and deepest of Earth's five oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south." },

    // --- GENERAL ---
    { keywords: ["hi", "hello"], response: "Hi there! I am BotSpoof, your assistant. How can I help you today?" },
    { keywords: ["how are you"], response: "I'm a bot, but I'm working perfectly! How about you?" },
    { keywords: ["who created you", "atul"], response: "I was created by Atul, a software developer, to assist you with information and chat!" },
    { keywords: ["thank you", "thanks"], response: "You're very welcome!" },
    { keywords: ["bye", "goodbye"], response: "Goodbye! Have a great day!" }
];

export default knowledgeBase;
