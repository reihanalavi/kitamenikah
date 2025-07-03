
-- Pastikan trigger untuk handle_successful_payment aktif
DROP TRIGGER IF EXISTS trigger_successful_payment ON midtrans_transactions;

CREATE TRIGGER trigger_successful_payment
    AFTER UPDATE ON midtrans_transactions
    FOR EACH ROW
    EXECUTE FUNCTION handle_successful_payment();

-- Pastikan ada index untuk performa yang baik
CREATE INDEX IF NOT EXISTS idx_midtrans_transactions_order_id ON midtrans_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_midtrans_transactions_status ON midtrans_transactions(status);
