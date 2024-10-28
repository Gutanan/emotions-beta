// smartContractService.js
import {BrowserProvider, Contract, formatEther, parseEther} from 'ethers';
import contractABI from './ABI.json';

const contractAddress = "0x46424D1819b0A1E59729c900e33D6AcdE0e7e76C";

// Funkce pro připojení k peněžence a inicializaci kontraktu
export async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new Contract(contractAddress, contractABI, signer);

            console.log("Úspěšně připojeno:", account);
            return { account, contract };
        } catch (error) {
            console.error("Připojení k MetaMask selhalo", error);
            throw error;
        }
    } else {
        throw new Error("MetaMask není nainstalován.");
    }
}

export async function getClientBalance(contract) {
    try {
        const result = await contract.getClientBalance();
        const etherBalance = formatEther(result); // Převádí automaticky na Ether
        console.log("Balace je:", etherBalance);
        return parseFloat(etherBalance).toFixed(5); // Na 5 desetinných míst
    } catch (error) {
        console.error("Chyba při získávání balancí klienta:", error);
        throw error;
    }
}

export async function deposit(contract, amount) {
    try {
        // Převod částky na formát Ether (wei)
        const tx = await contract.deposit({ value: parseEther(amount) });
        await tx.wait(); // Počkejte na potvrzení transakce
        console.log("Deposit úspěšný:", amount, "Ether");
        return tx;
    } catch (error) {
        console.error("Chyba při volání deposit:", error);
        throw error;
    }
}

export async function addEntry(contract, entry) {
    try {
        const tx = await contract.addEntry(entry);
        await tx.wait(); // Počkejte na potvrzení transakce
        console.log("Entry přidán:", entry);
        return tx;
    } catch (error) {
        console.error("Chyba při volání addEntry:", error);
        throw error;
    }
}

export async function grantAccess(contract) {
    try {
        const tx = await contract.grantAccess({
            value: parseEther("0.0001") // Nastavení částky, která se pošle s transakcí
        });
        await tx.wait(); // Počkejte na potvrzení transakce
        console.log("Přístup udělen");
        return tx;
    } catch (error) {
        console.error("Chyba při volání grantAccess:", error);
        throw error;
    }
}

export async function getEntries(contract) {
    try {
        const entries = await contract.getEntries();
        console.log("Entries získány:", entries);
        return entries; // Vrátí pole řetězců
    } catch (error) {
        console.error("Chyba při volání getEntries:", error);
        throw error;
    }
}

export async function withdrawPayment(contract, amount) {
    try {
        const tx = await contract.withdrawPayment(parseEther(amount)); // Převede částku na wei
        await tx.wait(); // Počkejte na potvrzení transakce
        console.log(`Vybráno ${amount} Ether`);
        return tx;
    } catch (error) {
        console.error("Chyba při volání withdrawPayment:", error);
        throw error;
    }
}

export async function shareWith(contract, moneySender, sharedText, cash) {
    try {
        // Převádí částku `cash` na wei a volá funkci shareWith na smart contractu
        const tx = await contract.shareWith(moneySender, sharedText, parseEther(cash), {
            value: parseEther("0.005") // Nastavení minimální částky požadované smart contractem
        });
        await tx.wait(); // Počkejte na potvrzení transakce
        console.log(`Přístup sdílen s ${moneySender} za částku ${cash} Ether a textem: ${sharedText}`);
        return tx;
    } catch (error) {
        console.error("Chyba při volání shareWith:", error);
        throw error;
    }
}


