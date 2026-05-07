# Security Specification for SAHRIKA

## Data Invariants
- A user can only access their own profile and orders.
- Only sellers can create or edit products (though for now we might simplify to allow any registered user for the demo if not strictly enforced, but let's be secure).
- Product prices must be positive.
- Orders must be immutable once created, except for status updates by admins/sellers.

## The "Dirty Dozen" Payloads

1. **Identity Theft (User Profile)**: Try to update another user's `displayName`.
2. **Role Escalation**: Try to set `role: 'admin'` or similar if it existed.
3. **Ghost Field Injection**: Add `isVerified: true` to a user profile update.
4. **Price Manipulation**: Create a product with price `-100`.
5. **Orphaned Order**: Create an order for a user ID that doesn't match the authenticated user.
6. **Immutable Field Change**: Try to change `userId` of an existing order.
7. **Invalid Type**: Set `bonusPoints` as a string.
8. **Large String Attack**: Set `displayName` to 1MB string.
9. **State Shortcut**: Try to update an order status from `pending` directly to `delivered` bypassing steps (if enforced, but let's ensure only authorized can change status).
10. **ID Poisoning**: Create a document with ID `../../secrets`.
11. **Email Spoofing**: Access sensitive data with an unverified email (if `email_verified` check is on).
12. **Blanket Read Attempt**: Try to list all users as a customer.

## The Test Runner (Draft)
A separate test file will be created to verify these scenarios.
