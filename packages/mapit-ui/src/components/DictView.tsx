import { ProjectProvider } from '../contexts/project.context';
import { Card } from 'antd';
import { DictionaryList } from '../pages/dictionary/components/dictionary';
import { DictionaryItemList } from '../pages/dictionary/components/dictionary-item';
import React, { useState } from 'react';

type DictViewProps = {
  projectId?: string | null;
};

const DictView = ({ projectId }: DictViewProps) => {
  const [selectedDictionaryId, setSelectedDictionaryId] = useState<string | null>(null);
  return (
    <div>
      {projectId && (
        <ProjectProvider initialProjectId={projectId}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 24,
              padding: 24,
              minHeight: 600,
            }}
          >
            {/* 左侧 */}
            <Card
              style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
              styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
            >
              {projectId && <DictionaryList projectId={projectId} onDictionarySelect={setSelectedDictionaryId} />}
            </Card>
            {/* 右侧 */}
            <Card
              style={{ flex: 1, minWidth: 0, height: 500, display: 'flex', flexDirection: 'column' }}
              styles={{ body: { flex: 1, minHeight: 400, display: 'flex', flexDirection: 'column' } }}
            >
              {projectId && selectedDictionaryId && (
                <DictionaryItemList projectId={projectId} selectedDictionaryId={selectedDictionaryId} />
              )}
            </Card>
          </div>
        </ProjectProvider>
      )}
    </div>
  );
};

export { DictView };

export type { DictViewProps };
