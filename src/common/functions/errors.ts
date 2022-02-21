export const parseError = (err: any) => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};
