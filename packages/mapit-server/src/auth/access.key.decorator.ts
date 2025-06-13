import { SetMetadata } from '@nestjs/common';

export const ACCESS_KEY_REQUIRED = 'access_key_required';

// 标记需要校验 AccessKey 的接口
export const AccessKey = () => SetMetadata(ACCESS_KEY_REQUIRED, true);

