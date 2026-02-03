# Game Helper

This project provides a simple Bun TypeScript script to fetch a user's game list from the Steam API and get game recommendations from an LLM based on your mood. It's designed to be run in a containerized environment using Docker for isolation and reproducibility, or directly using Bun.

## Features

- Fetches owned games from the Steam Web API.
- Caches the game list to avoid repeated API calls.
- Integrates with Ollama to provide game recommendations based on your mood.
- Mood can be passed as a command-line argument for dynamic recommendations.
- Extensible design to support other game platforms and LLM providers.
- Includes a Dockerfile for easy containerization.

## Prerequisites

To run this project, you will need:

- **Bun**: If you plan to run the script directly (not via Docker).
- **Docker**: If you plan to run the script in a container.
- **Ollama**: To use the game recommendation feature. You can download it from [https://ollama.ai/](https://ollama.ai/).

## Setup and Running

Follow these steps to get the project set up and running:

### 1. Obtain Steam API Key and User ID

You need a Steam API Key and your Steam User ID to access the Steam Web API.

1.  **Obtain a Steam API Key:**
    *   Go to [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
    *   Log in with your Steam account.
    *   Register a new API key by entering a domain name (you can use anything, like `localhost`, as this script will be run locally).
    *   Agree to the Steam Web API Terms of Use.
    *   Your API key will be displayed. Copy it.

2.  **Find your Steam User ID:**
    *   Your Steam ID is a unique identifier for your Steam account.
    *   You can often find it by going to your Steam profile page. If your URL is `https://steamcommunity.com/profiles/76561198000000000/`, then `76561198000000000` is your Steam ID.
    *   If your profile has a custom URL (e.g., `https://steamcommunity.com/id/yourcustomname/`), you can find your Steam ID by:
        *   Opening Steam, going to `View > Settings > Interface`, and checking "Display Steam URL address bar when available".
        *   Then go to your profile, and the URL at the top will show your numeric Steam ID after `/profiles/`.

### 2. Set up Ollama

To get game recommendations, you need to have Ollama running on your local machine.

1.  **Install Ollama:**
    *   Download and install Ollama from [https://ollama.ai/](https://ollama.ai/).
2.  **Download a model:**
    *   Open your terminal and run the following command to download a model (e.g., `llama3.1`):
        ```bash
        ollama pull llama3.1
        ```
    *   You can use any other model you prefer. Make sure to update the model name in your `.env` file (see below) if you use a different one.
3.  **Ensure Ollama is running:**
    *   Ollama should be running in the background. You can check its status by running `ollama ps` in your terminal.

### 3. Create a `.env` file

In the root directory of this project (where `package.json` and `Dockerfile` are located), create a file named `.env`.

Add the following lines to it, replacing the placeholders with your actual API key and Steam User ID:

```
STEAM_API_KEY=YOUR_STEAM_API_KEY
STEAM_USER_ID=YOUR_STEAM_USER_ID
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
```

You can also optionally specify a custom Ollama URL if it's not running on the default `http://localhost:11434`:

```
OLLAMA_URL=http://your-ollama-host:11434
```

### 4. Running the Script

You have two options for running the script: using Docker or directly with Bun.

#### Option 1: Using Docker (Recommended)

1.  **Build the Docker image:**
    ```bash
    docker build -t game-helper .
    ```
2.  **Run the Docker container:**
    *   Make sure your `.env` file is in the project root.
    *   Run the container, mounting the `.env` file into the container:
        ```bash
        docker run --rm -it --env-file ./.env --network=host game-helper
        ```
    *   `--network=host` is required to allow the Docker container to access the Ollama service running on your host machine.

#### Option 2: Running directly with Bun

1.  **Install dependencies:**
    ```bash
    bun install
    ```
2.  **Run the script with a mood:**
    *   Ensure your `.env` file is in the project root.
    *   To get a recommendation based on a specific mood:
        ```bash
        bun start "Tired, but need for calm stimulation, unrealistic game"
        ```

## Example Output

Here is an example of the kind of output you can expect from the script:

```
Based on your mood: "Tired, but need for calm stimulation, unrealistic game"

Here is my recommendation:

Based on your current mood and the list of games provided, I've selected a few recommendations that should provide a suitable balance between relaxation and engaging gameplay.

**Recommendation 1: LIMBO**

I highly recommend starting with LIMBO. This puzzle-platformer is known for its simple yet challenging gameplay, which requires logical thinking rather than high-stakes action. The game's atmosphere and visuals are beautifully calming, making it an excellent choice for a tired but engaged player.

**Recommendation 2: Celeste**

Celeste is another great option that combines puzzle-solving with a relaxing experience. This challenging platformer focuses on exploration, climbing, and overcoming obstacles, rather than combat or high-pressure situations. Its minimalist art style and soothing soundtrack will help you unwind while still providing engaging gameplay.

**Recommendation 3: FEZ**

FEZ is a charming puzzle-platformer that features a unique perspective-shifting mechanic. While it has some challenging moments, the game's overall atmosphere is calm and meditative, making it an excellent choice for players seeking relaxation. The vibrant visuals and catchy soundtrack also contribute to the soothing experience.

These three games offer a mix of puzzles, exploration, and relaxing gameplay that should help you unwind while still engaging your mind.
```

## Epic Games Integration

Please note that there is no official public API provided by Epic Games to fetch a user's game library. Accessing this information would typically require reverse-engineering their internal, private APIs, which is a complex process and may be against Epic Games' terms of service. For these reasons, Epic Games integration is not included in this project at this time.