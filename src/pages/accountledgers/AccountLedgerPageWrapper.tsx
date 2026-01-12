import React from "react";
import { useParams } from "react-router-dom";
import AccountLedgerPage from "./AccountLedger";

export default function AccountLedgerPageWrapper() {
  const { accountId } = useParams<{ accountId: string }>();

  // fallback if accountId is missing or invalid
  if (!accountId) {
    return (
      <div className="p-8">
        <p className="text-red-500 font-semibold">
          No account selected. Please select an account to view the ledger.
        </p>
      </div>
    );
  }

  const parsedId = Number(accountId);
  if (isNaN(parsedId)) {
    return (
      <div className="p-8">
        <p className="text-red-500 font-semibold">Invalid account ID.</p>
      </div>
    );
  }

  return <AccountLedgerPage accountId={parsedId} />;
}
