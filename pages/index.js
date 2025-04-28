import Head from 'next/head';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    useEffect(() => {
        // Handle smooth scrolling
        const handleSmoothScroll = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        };

        // Add event listeners to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Simple animation on scroll
        const animateOnScroll = function() {
            const featureColumns = document.querySelectorAll(`.${styles.featureColumn}`);

            featureColumns.forEach(column => {
                const position = column.getBoundingClientRect();

                // If element is in viewport
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    column.style.opacity = '1';
                }
            });
        };

        // Set initial state for animation
        document.querySelectorAll(`.${styles.featureColumn}`).forEach(column => {
            column.style.opacity = '0';
            column.style.transition = 'opacity 0.5s ease';
        });

        // Run animation on scroll
        window.addEventListener('scroll', animateOnScroll);

        // Run once on load
        animateOnScroll();

        // Cleanup function
        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
            window.removeEventListener('scroll', animateOnScroll);
        };
    }, []);

    const handleWaitlistSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();

        if (email) {
            // In a real implementation, you would send this to your backend
            alert('Thank you for joining our waitlist! We\'ll notify you when BOTTEIN launches.');
            e.target.email.value = '';

            // Here you could implement API call to store emails
            // or use localStorage temporarily
            const waitlistEmails = JSON.parse(localStorage.getItem('waitlistEmails') || '[]');
            waitlistEmails.push({
                email: email,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('waitlistEmails', JSON.stringify(waitlistEmails));
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>BOTTEIN - Personalized Meal Replacement Solution</title>
                <meta name="description" content="Personalized Meal Replacement Solution for Young Professionals, Engineered for Your Success" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.logo}>BOTTEIN</h1>
                    <nav>
                        <ul className={styles.navList}>
                            <li><a href="#about">About</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#waitlist">Join Waitlist</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section id= "about" className={styles.hero}>
                <div className={styles.heroContainer}>
                    <h2>Personalized Meal Replacement Solution for Young Professionals, Engineered for Your Success</h2>
                    <div className={styles.useCases}>
                        <p>(for those morning exams)</p>
                        <p>(for those gym session)</p>
                        <p>(for a healthier life-style)</p>
                        <p>(for those hours cramming)</p>
                        <p>(for those long lectures)</p>
                    </div>
                    <a href="#waitlist" className={styles.ctaButton}>Join Waitlist</a>
                </div>
            </section>

            <section id="features" className={styles.features}>
                <div className={styles.featuresContainer}>
                    <div className={styles.featureColumn}>
                        <h3>Quality <span className={styles.highlight}>(Core)</span></h3>
                        <ul>
                            <li>100% Real Fruit Powder with Plant or Whey Protein</li>
                            <li>No Artificial Flavors or Colours</li>
                            <li>Limited Production</li>
                        </ul>
                    </div>
                    <div className={styles.featureColumn}>
                        <h3>Personalization <span className={styles.highlight}>(Method)</span></h3>
                        <ul>
                            <li>Addresses Your Needs</li>
                            <li>Mix and Match Curated Flavours</li>
                            <li>AI-Powered Formulation Assessment with Strict Expert Verification</li>
                        </ul>
                    </div>
                    <div className={styles.featureColumn}>
                        <h3>Function <span className={styles.highlight}>(Benefits)</span></h3>
                        <ul>
                            <li>Focus, Sleep, Fitness, Skincare, General Wellness improvements</li>
                            <li>Precise Dosage based on Your Health Factor</li>
                            <li>Continuously Optimized Formula Updates</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.comingSoon}>
                <div className={styles.comingSoonContainer}>
                    <h3>Build your own: <span className={styles.highlight}>(Coming Soon)</span></h3>
                    <div className={styles.placeholderBox}></div>

                    <h3>Nutritional Facts: <span className={styles.highlight}>(Coming Soon)</span></h3>
                    <div className={styles.placeholderBox}></div>
                </div>
            </section>

            <section id="waitlist" className={styles.waitlist}>
                <div className={styles.waitlistContainer}>
                    <h3>Coming September, 2025</h3>
                    <p>Join our waitlist (Opening late August 2025)</p>
                    <form id="waitlist-form" className={styles.waitlistForm} onSubmit={handleWaitlistSubmit}>
                        <input type="email" name="email" placeholder="Enter your email" required />
                        <button type="submit" className={styles.ctaButton}>Join Waitlist</button>
                    </form>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <p>Founded by Yushu Wang, Christina Sun, and Martin Shanahan.</p>
                    <p>On a mission to empower young professionals by making optimal nutrition accessible, because health is the foundation for success.</p>
                    <p>Ins: <a href="https://instagram.com/bottein.ca" target="_blank" rel="noopener noreferrer">@bottein.ca</a></p>
                    <p className={styles.version}>ver0.02</p>
                </div>
            </footer>
        </div>
    );
}