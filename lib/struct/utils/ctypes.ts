export type CommandHandlerOptions = {
    path: string,
    prefix?: string,
    blockBot?: boolean,
    prefixMention?: boolean,
    ignoreUsers?: string[],
    defaultCooldown?: number,
    ignoreCooldownUsers?: string[],
}

export type EventHandlerOptions = {
    path: string
}

export type ClientOptions = {
    token: string 
    prefix?: string,
    ownersID?: string[],
}
