import Link from "next/link";

export default function Home() {
  const randomId = Math.floor(Math.random() * 905) + 1;

  return (
    randomId && (
      <div>
        <Link href={`/pokedex/${randomId}`}>Pokédex</Link>
      </div>
    )
  );
}
