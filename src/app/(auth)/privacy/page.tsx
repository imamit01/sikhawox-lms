export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                <h1 className="text-3xl font-heading font-bold text-white mb-6">Privacy Policy</h1>
                <div className="space-y-6 text-slate-300">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, including name, email address, and course progress data.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information against unauthorized access.</p>
                    </section>
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Your Rights</h2>
                        <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
