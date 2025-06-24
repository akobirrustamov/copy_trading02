import psycopg2

# Database connection info
db_config = {
    "dbname": "reda",
    "user": "postgres",
    "password": "akow8434",
    "host": "localhost",
    "port": "5433"
}

def get_wallets():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        # Execute query
        cursor.execute("SELECT * FROM traders WHERE trader_type = 2")
        rows = cursor.fetchall()

        # Print full rows (optional, for debug)
        print("Full Rows:", rows)

        # Extract only uid column (wallets)
        wallets = [row[0] for row in rows]  # Assuming 'uid' is the first column
        return wallets

    except Exception as e:
        print("Error connecting to database:", e)
        return []

    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

# Example usage
if __name__ == "__main__":
    wallets = get_wallets()
    for wallet in wallets:
        print("Wallet UID:", wallet)
