ARG NODE_VERSION=22
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${NODE_VERSION}-bookworm

ARG CODEX_CLI_VERSION=0.147.0
ARG GITLEAKS_VERSION=8.29.1
ARG GITLEAKS_SHA256=e4eb209d04e20339d77122a3bdf9cd41351255cfb27ebcb75e85325e04f88924

USER root

RUN apt-get update \
    && apt-get install --yes --no-install-recommends ca-certificates curl jq python3 ripgrep \
    && rm -rf /var/lib/apt/lists/*

RUN curl --fail --silent --show-error --location \
      --output /tmp/gitleaks.tar.gz \
      "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/gitleaks_${GITLEAKS_VERSION}_linux_x64.tar.gz" \
    && echo "${GITLEAKS_SHA256}  /tmp/gitleaks.tar.gz" | sha256sum --check --strict - \
    && tar --extract --gzip --file /tmp/gitleaks.tar.gz --directory /usr/local/bin gitleaks \
    && chmod 0755 /usr/local/bin/gitleaks \
    && rm /tmp/gitleaks.tar.gz

RUN npm install --global "@openai/codex@${CODEX_CLI_VERSION}" \
    && npm cache clean --force

RUN install --directory --owner=node --group=node /home/node/.codex
