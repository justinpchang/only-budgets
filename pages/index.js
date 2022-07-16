import Head from "next/head";
import Link from "next/link";

import { useAuth } from "../components/Auth/auth";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  // loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>OnlyBudgets</title>
        <meta name="description" content="Budgets made simple" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>OnlyBudgets</h1>
        {user ? (
          <>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
            <button onClick={signOut}>Log Out</button>
          </>
        ) : (
          <>
            <h2>Log in or Sign up to see data</h2>
            <div>
              <Link href="/login">
                <div>
                  <h2>Login &rarr;</h2>
                </div>
              </Link>
              <Link href="/signup">
                <div>
                  <h2>Signup &rarr;</h2>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
