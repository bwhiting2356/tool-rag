## Tool RAG

### Introduction

Tool RAG is a small prototype designed to explore the potential of integrating “unlimited” tools into a Large Language Model (LLM) using Retrieval-Augmented Generation (RAG). This approach aims to enhance the LLM’s capabilities by dynamically retrieving the most relevant tools based on the current context and query.

### Context and Limitations

While modern LLMs come with extensive context windows, enabling them to process large amounts of data in a single interaction, they are not truly unlimited as tokens are not free (in time or money). Using a RAG process to pick the best tools to feed into an LLM can allow the capabilities of the LLM to scale without increasing tokens in the context.

### Demo

<img src="https://github.com/bwhiting2356/memory-bot/assets/16016903/028e01c7-fcab-4cf3-aa26-efff5e05d865" alt="Tool RAG" width="300"/>

Check out the deployed prototype [here](https://memory-bot-five.vercel.app/).
