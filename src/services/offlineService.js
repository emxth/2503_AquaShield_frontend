import { openDB } from "idb";

const DB_NAME = 'AquaSheildDB';
const DB_VERSION = 1;
const STORE_INCIDENT_TYPES = 'incidentTypes';
const STORE_PENDING_REPORTS = 'pendingReports';

class OfflineService {

    constructor() {
        this.db = null;
        this.init();
    }

    async init() {
        this.db = await openDB(DB_NAME, DB_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_INCIDENT_TYPES)) {
                    db.createObjectStore(STORE_INCIDENT_TYPES, { keyPath: 'id' });
                }

                if (!db.objectStoreNames.contains(STORE_PENDING_REPORTS)) {
                    db.createObjectStore(STORE_PENDING_REPORTS, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }
            },
        })
    }

    async cacheIncidentTypes(types) {

        if (!this.db) await this.init();

        const tx = this.db.transaction(STORE_INCIDENT_TYPES, 'readwrite');
        await tx.objectStore(STORE_INCIDENT_TYPES).clear();
        for (const type of types) {
            await tx.objectStore(STORE_INCIDENT_TYPES).put(type);
        }

        await tx.done;
    }

    async getCachedIncidentTypes() {
        if (!this.db) await this.init();

        const tx = this.db.transaction(STORE_INCIDENT_TYPES, 'readonly');
        const types = await tx.objectStore(STORE_INCIDENT_TYPES).getAll();
        await tx.done;

        return types;
    }

    async savePendingReport(reportData) {
        if (!this.db) await this.init();

        const tx = this.db.transaction(STORE_PENDING_REPORTS, 'readwrite');
        const id = await tx.objectStore(STORE_PENDING_REPORTS).add({
            ...reportData,
            timestamp: new Date().toISOString(),
            status: 'pending'
        });

        await tx.done;
        return id;
    }

    async getPendingReports() {
        if (!this.db) await this.init();

        const tx = this.db.transaction(STORE_PENDING_REPORTS, 'readonly');
        const reports = await tx.objectStore(STORE_PENDING_REPORTS).getAll();
        await tx.done;

        return reports;
    }

    async removePendingReport(id) {
        if (!this.db) await this.init();

        const tx = this.db.transaction(STORE_PENDING_REPORTS, 'readwrite');
        await tx.objectStore(STORE_PENDING_REPORTS).delete(id);
        await tx.done;
    }

    isOnline() {
        return navigator.onLine;
    }
}

export const offlineService = new OfflineService();