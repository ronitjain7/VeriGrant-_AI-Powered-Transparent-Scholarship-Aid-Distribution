import Card from "components/card";
import { MdVerified } from "react-icons/md";

const StudentIdCard = () => {
    return (
        <Card extra="p-[20px] text-center bg-gradient-to-br from-brandLinear to-brand-500 text-white min-h-[220px]">
            <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <h4 className="text-2xl font-bold">VeriGrant ID</h4>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        <MdVerified className="text-white h-4 w-4" />
                        <span className="text-xs font-bold">VERIFIED</span>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-8">
                    <p className="text-xs font-medium opacity-80 uppercase tracking-wider">Wallet Address</p>
                    <p className="text-lg font-mono font-bold tracking-widest mt-1">XA3...9L2</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                    <div className="flex flex-col items-start">
                        <p className="text-[10px] font-bold opacity-70">EXPIRATION</p>
                        <p className="text-sm font-bold">12/26</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-10 bg-white/20 rounded-md border border-white/30"></div> {/* Chip */}
                        <div className="text-2xl font-bold italic opacity-50">VISA</div> {/* Just for style */}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StudentIdCard;
