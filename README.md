# VeriGrant 🎓

**AI-Powered Transparent Scholarship & Aid Distribution on Algorand**

VeriGrant is a decentralized scholarship platform that combines AI-powered evaluation with blockchain transparency to revolutionize educational funding. Built on Algorand, it ensures fair, tamper-proof, and privacy-preserving scholarship distribution.

---

## 🌟 Features

### 1. **AI-Powered Evaluation**

- **Gemini AI Integration**: Analyzes scholarship essays for clarity, passion, and impact
- **Multi-Factor Scoring**: Combines academic merit (GPA), financial need, and essay quality
- **Transparent Reasoning**: Provides detailed breakdown of scoring criteria

### 2. **Privacy-Preserving Design**

- **SHA-256 Hashing**: Sensitive applicant data (name, income) is hashed before storage
- **On-Chain Proof**: Only hashes and scores are recorded, protecting student privacy
- **Wallet-Based Identity**: Uses Algorand wallet addresses for verification

### 3. **Blockchain Transparency**

- **Smart Contract Payouts**: Automated fund distribution via Algorand smart contracts
- **Immutable Audit Trail**: All transactions recorded on-chain
- **Secure Architecture**: Rekey protection prevents unauthorized fund access

### 4. **Modern Full-Stack Application**

- **React + Next.js Frontend**: Beautiful, responsive UI with dark mode
- **FastAPI Backend**: High-performance Python API with CORS support
- **Pera Wallet Integration**: Seamless Algorand wallet connectivity

---

## 🏗️ Architecture

```
VeriGrant/
├── frontend/              # Next.js React application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # Reusable UI components
│   │   ├── contexts/     # React contexts (Wallet)
│   │   └── utils/        # API client utilities
│   └── .env.local        # Frontend environment config
│
├── backend/
│   └── projects/
│       ├── backend/      # FastAPI Python server
│       │   ├── main.py           # API endpoints
│       │   ├── hashing.py        # Privacy utilities
│       │   └── requirements.txt  # Python dependencies
│       │
│       └── contracts/    # Algorand Smart Contracts
│           └── smart_contracts/
│               └── verigrant/
│                   ├── contract.py       # AlgoPy smart contract
│                   └── deploy_config.py  # Deployment script
│
└── verify_deployment.py  # Blockchain verification utility
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.12+
- **AlgoKit** CLI
- **Docker** (for LocalNet)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/ronitjain7/VeriGrant-_AI-Powered-Transparent-Scholarship-Aid-Distribution.git
cd VeriGrant-_AI-Powered-Transparent-Scholarship-Aid-Distribution
```

### 2. Start Algorand LocalNet

```bash
algokit localnet start
```

### 3. Deploy Smart Contract

```bash
cd backend/projects/contracts
algokit project bootstrap all
algokit project deploy localnet
```

**Note the App ID** from the deployment output (e.g., `1023`).

### 4. Setup Backend

```bash
cd ../backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
```

**Update `main.py`** with your deployed App ID:

```python
APP_ID = 1023  # Replace with your actual App ID
```

**Optional: Add Gemini API Key** (for real AI scoring):
Create `.env` in `backend/projects/backend/`:

```
GEMINI_API_KEY=your_api_key_here
```

**Fund the Smart Contract**:

```bash
python
>>> from algokit_utils import AlgorandClient, PaymentParams, AlgoAmount
>>> algorand = AlgorandClient.default_localnet()
>>> deployer = algorand.account.localnet_dispenser()
>>> contract_addr = "YOUR_CONTRACT_ADDRESS"  # From deployment
>>> algorand.send.payment(PaymentParams(sender=deployer.address, receiver=contract_addr, amount=AlgoAmount(algo=10), signer=deployer.signer))
>>> exit()
```

**Start Backend**:

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 5. Setup Frontend

```bash
cd ../../../frontend
npm install
```

**Configure Environment** (`.env.local`):

```env
# For LocalNet
NEXT_PUBLIC_ALGOD_SERVER=http://localhost
NEXT_PUBLIC_ALGOD_PORT=4001
NEXT_PUBLIC_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
NEXT_PUBLIC_ALGOD_NETWORK=localnet

NEXT_PUBLIC_INDEXER_SERVER=http://localhost
NEXT_PUBLIC_INDEXER_PORT=8980
NEXT_PUBLIC_INDEXER_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

**Start Frontend**:

```bash
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 📖 Usage

### For Students

1. **Connect Wallet**: Use Pera Wallet to connect your Algorand address
2. **Submit Application**: Fill out the 3-step form:
   - Identity (Name + Wallet)
   - Academic Info (GPA, Family Income)
   - Scholarship Essay
3. **AI Evaluation**: Backend analyzes your application and assigns a score
4. **Track Status**: View your application status in the dashboard

### For Administrators

1. **Review Applications**: Access `/admin/applicants` to see all submissions
2. **Trigger Payouts**: Call `POST /payout` to distribute funds to "Excellent" candidates
3. **Audit Transactions**: View blockchain transaction history at `/transactions`

---

## 🧪 Testing

### Automated End-to-End Test

```bash
cd backend/projects/backend
python test_e2e.py
```

This script:

1. Creates a test student wallet
2. Submits a scholarship application
3. Verifies backend scoring
4. Triggers smart contract payout
5. Confirms on-chain balance change

### Manual Testing

1. Navigate to `http://localhost:3000/admin/apply`
2. Use test data:
   - **GPA**: `3.9` (high merit)
   - **Family Income**: `15000` (high need)
   - **Essay**: Write a compelling 300+ word essay
3. Check Admin Dashboard to see your score
4. Trigger payout via API or UI

---

## 🔐 Security Features

### Smart Contract Security

- **Rekey Protection**: Prevents unauthorized account takeovers
- **Admin-Only Disbursement**: Only contract creator can trigger payouts
- **Inner Transaction Validation**: Ensures proper fee coverage

### Backend Security

- **CORS Middleware**: Restricts API access to trusted origins
- **Input Validation**: Pydantic models enforce data integrity
- **Privacy Hashing**: Sensitive data never stored in plaintext

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Blockchain** | Algorand (AlgoPy Smart Contracts) |
| **Backend** | FastAPI (Python 3.12) |
| **Frontend** | Next.js 15, React 19, TypeScript |
| **AI** | Google Gemini Pro |
| **Wallet** | Pera Wallet Connect |
| **Styling** | TailwindCSS |
| **Dev Tools** | AlgoKit, Docker, Poetry |

---

## 📊 Smart Contract Details

**Contract Name**: `VeriGrant-Secure-v1`

### Methods

- `disburse_grant(recipient: Account, amount: UInt64)`: Sends ALGO to approved applicant
- Validates sender is admin
- Checks for rekey attempts
- Executes inner payment transaction

### Deployment

- **LocalNet**: For development and testing
- **TestNet**: For staging (configure `.env.local` with TestNet endpoints)
- **MainNet**: Production deployment (requires real ALGO funding)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Ronit Jain** - [@ronitjain7](https://github.com/ronitjain7)
- **Ashraf** - [@AshrafGalaxy](https://github.com/AshrafGalaxy)

---

## 🙏 Acknowledgments

- **Algorand Foundation** for the blockchain infrastructure
- **Google Gemini** for AI capabilities
- **AlgoKit Team** for development tools
- **Pera Wallet** for wallet integration

---

## 📞 Support

For issues, questions, or feature requests, please open an issue on GitHub.

**Built with ❤️ for transparent education funding**
