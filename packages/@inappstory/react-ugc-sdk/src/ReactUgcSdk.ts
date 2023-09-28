export class ReactUgcSdk {
    public static get sdkVersionName(): string {
        const sdkVersionName = process.env.SDK_VERSION;
        return sdkVersionName || "0.0.0";
    }

    public static get sdkVersionCode(): number {
        const sdkVersionCode = process.env.SDK_VERSION_CODE;
        return sdkVersionCode ? parseInt(String(sdkVersionCode)) : 0;
    }
}
