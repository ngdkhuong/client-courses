import React from 'react';

const InstructorPage: React.FC = () => {
    return (
        <div>
            <section className="bg-gray-100 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Come teach with us</h1>
                    <p className="text-lg mb-6">Become an instructor and change lives — including your own</p>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">Get started</button>
                </div>
            </section>
            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-10">So many reasons to start</h2>
                <div className="flex justify-around">
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Teach your way</h3>
                        <p>
                            Publish the course you want, in the way you want, and always have control of your own
                            content.
                        </p>
                    </div>
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Inspire learners</h3>
                        <p>
                            Teach what you know and help learners explore their interests, gain new skills, and advance
                            their careers.
                        </p>
                    </div>
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Get rewarded</h3>
                        <p>Expand your professional network and make money on each paid enrollment.</p>
                    </div>
                </div>
            </section>
            <section className="bg-purple-600 text-white py-20 text-center">
                <div className="flex justify-around">
                    <div>
                        <strong className="text-4xl block">62M</strong>
                        <span>Students</span>
                    </div>
                    <div>
                        <strong className="text-4xl block">75+</strong>
                        <span>Languages</span>
                    </div>
                    <div>
                        <strong className="text-4xl block">830M</strong>
                        <span>Enrollments</span>
                    </div>
                    <div>
                        <strong className="text-4xl block">180+</strong>
                        <span>Countries</span>
                    </div>
                    <div>
                        <strong className="text-4xl block">15,000+</strong>
                        <span>Enterprise customers</span>
                    </div>
                </div>
            </section>
            <section className="py-20 text-center">
                <h2 className="text-3xl font-bold mb-10">How to begin</h2>
                <div className="flex justify-around">
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Plan your curriculum</h3>
                        <p>
                            You start with your passion and knowledge. Then choose a promising topic with the help of
                            our Marketplace Insights tool.
                        </p>
                    </div>
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Record your video</h3>
                        <p>
                            Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready
                            to start shooting.
                        </p>
                    </div>
                    <div className="max-w-sm p-4">
                        <h3 className="text-xl font-semibold mb-2">Launch your course</h3>
                        <p>
                            Gather your resources and upload your videos to Udemy. Once your course is live, share it
                            with the world.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-20 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="flex flex-col items-center">
                        <img
                            src="/path/to/instructor-photo.jpg"
                            alt="Instructor Name"
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <blockquote className="italic mb-4">
                            "I'm proud to wake up knowing my work is helping people around the world improve their lives
                            and build great things. While being a full-time instructor is hard work, it lets you work
                            when, where, and how you want."
                        </blockquote>
                        <cite>Instructor Name</cite>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InstructorPage;
