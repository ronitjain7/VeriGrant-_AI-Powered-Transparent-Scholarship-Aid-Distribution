
import { mockGrants } from 'data/mockData';
import NftCard from 'components/card/NftCard';
import { useRouter } from 'next/navigation';

const BrowseGrants = () => {
    const router = useRouter();

    return (
        <div className="mt-5 grid h-full grid-cols-1 gap-5">
            <div className="flex flex-col justify-between items-start md:flex-row md:items-center">
                <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
                    Available Grants & Scholarships
                </h4>
                <div className="mt-2 md:mt-0 flex gap-2">
                    <span className="px-4 py-2 bg-white dark:bg-navy-800 rounded-lg text-sm font-medium shadow-sm border border-gray-100 dark:border-none">
                        🔥 Popular
                    </span>
                    <span className="px-4 py-2 bg-white dark:bg-navy-800 rounded-lg text-sm font-medium shadow-sm border border-gray-100 dark:border-none text-gray-500">
                        ✨ Newest
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
                {mockGrants.map((grant) => (
                    <div key={grant.id} className="relative">
                        <NftCard
                            title={grant.title}
                            author="VeriGrant Foundation"
                            price={grant.pool}
                            image={grant.image}
                            bidders={[
                                "/img/avatars/avatar1.png",
                                "/img/avatars/avatar2.png",
                                "/img/avatars/avatar3.png"
                            ]}
                            download="#"
                        />
                        {/* Overlay Button for Apply */}
                        <div className="absolute bottom-4 right-4 z-10">
                            <button
                                onClick={() => router.push('/student/apply')}
                                className="linear rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:opacity-90 shadow-lg shadow-brand-500/50"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseGrants;
